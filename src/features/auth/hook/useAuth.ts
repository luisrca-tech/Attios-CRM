import { useSignIn, useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '~/trpc/react';
import type { ConfirmEmail } from '../types/confirmEmail.type';
import type { RecoverPassword } from '../types/recoverPasssword.type';
import type { SignInFormType } from '../types/signInForm.type';
import type { VerifyCode } from '../types/signUpCodeVerify.type';
import type { SignUpFormType } from '../types/signUpForm.type';

export function useAuth() {
	const router = useRouter();
	const [emailVerify, setEmailVerify] = useState<boolean>(false);
	const [verifyCode, setVerifyCode] = useState<boolean>(false);

	const {
		signUp,
		isLoaded: isSignUpLoaded,
		setActive: setActiveSignUp
	} = useSignUp();
	const {
		signIn,
		setActive: setActiveSignIn,
		isLoaded: isSignInLoaded
	} = useSignIn();

	const createUserMutation = api.user.create.useMutation();

	async function signInUser({ email, password }: SignInFormType) {
		try {
			const result = await signIn?.create({
				identifier: email,
				password: password
			});

			if (result?.status === 'complete') {
				if (!setActiveSignIn) {
					return false;
				}

				await setActiveSignIn({ session: result.createdSessionId });
				window.location.href = window.location.origin.replace(/^[^.]+\./, '');
				return true;
			}

			if (result?.status === 'needs_first_factor') {
				toast.error('Error', {
					position: 'top-center',
					description: 'You are already signed in. Please sign out first.'
				});
				return false;
			}

			return false;
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				toast.error('Error', {
					position: 'top-center',
					description: error?.errors[0]?.longMessage
				});
			}
			return false;
		}
	}

	async function signUpUser({ email, password, fullName }: SignUpFormType) {
		try {
			await signUp?.create({
				emailAddress: email,
				password,
				firstName: fullName.split(' ')[0],
				lastName: fullName.split(' ')[1]
			});
			await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });
			setEmailVerify(true);
			return toast.success('Success', {
				position: 'top-center',
				description: 'We sent you a verification code to your email.'
			});
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				return toast.error('Error', {
					position: 'top-center',
					description: error?.errors[0]?.longMessage
				});
			}
			return toast.error('Error', {
				position: 'top-center',
				description: 'Something went wrong. Please try again.'
			});
		}
	}

	async function verifyEmail({ code }: VerifyCode) {
		if (!isSignUpLoaded) return null;

		try {
			const completeSignUp = await signUp?.attemptEmailAddressVerification({
				code
			});

			if (!completeSignUp.createdUserId) {
				throw new Error('Id was not provided');
			}

			if (completeSignUp.status === 'complete') {
				const email = completeSignUp.emailAddress;

				if (!email) {
					return toast.error('Error', {
						position: 'top-center',
						description: 'Email or name was not provided'
					});
				}

				await createUserMutation.mutateAsync({
					userId: completeSignUp.createdUserId,
					email: email,
					fullName: `${completeSignUp.firstName} ${completeSignUp.lastName}`
				});
				await setActiveSignUp({ session: completeSignUp.createdSessionId });
				return router.push('/');
			}
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				return toast.error('Error', {
					position: 'top-center',
					description: error?.errors[0]?.longMessage
				});
			}
			return toast.error('Error', {
				position: 'top-center',
				description: 'Something went wrong. Please try again.'
			});
		}
	}

	async function resendCode() {
		if (!isSignUpLoaded) return null;
		try {
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
			return toast.success('Success', {
				position: 'top-center',
				description: 'We resent you a verification code to your email.'
			});
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				return toast.error('Error', {
					position: 'top-center',
					description: error?.errors[0]?.longMessage
				});
			}
			return toast.error('Error', {
				position: 'top-center',
				description: 'Something went wrong. Please try again.'
			});
		}
	}

	const confirmEmailBeforeResetPassword = async ({ email }: ConfirmEmail) => {
		try {
			await signIn?.create({
				identifier: email,
				strategy: 'reset_password_email_code'
			});

			setVerifyCode(true);
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				return toast.error('Error', {
					position: 'top-center',
					description: error?.errors[0]?.longMessage
				});
			}
			return toast.error('Error', {
				position: 'top-center',
				description: 'Something went wrong. Please try again.'
			});
		}
	};

	const handleRecoverPassword = async ({ password, code }: RecoverPassword) => {
		try {
			const completeRecoverPassword = await signIn?.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code,
				password
			});

			if (completeRecoverPassword?.status === 'complete') {
				if (!setActiveSignIn) {
					return null;
				}
				await setActiveSignIn({
					session: completeRecoverPassword.createdSessionId
				});
			}
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				return toast.error('Error', {
					position: 'top-center',
					description: error?.errors[0]?.longMessage
				});
			}
			return toast.error('Error', {
				position: 'top-center',
				description: 'Something went wrong. Please try again.'
			});
		}
	};

	const signInWithGoogle = () =>
		signIn?.authenticateWithRedirect({
			strategy: 'oauth_google',
			redirectUrl: '/sso-callback',
			redirectUrlComplete: '/'
		});

	const signInWithFacebook = () =>
		signIn?.authenticateWithRedirect({
			strategy: 'oauth_facebook',
			redirectUrl: '/sso-callback',
			redirectUrlComplete: '/'
		});

	return {
		signUpUser,
		signInUser,
		emailVerify,
		isSignUpLoaded,
		isSignInLoaded,
		verifyEmail,
		resendCode,
		confirmEmailBeforeResetPassword,
		handleRecoverPassword,
		verifyCode,
		isLoading: createUserMutation.isPending,
		signInWithGoogle,
		signInWithFacebook
	};
}
