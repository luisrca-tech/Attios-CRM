import { useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '~/trpc/react';
import type { SignUpEmailVerify } from '../types/signUpEmailVerify.type';
import type { SignUpFormType } from '../types/signUpForm.type';

export function useAuth() {
	const router = useRouter();
	const [emailVerify, setEmailVerify] = useState<boolean>(false);
	const {
		signUp,
		isLoaded: isSignUpLoaded,
		setActive: setActiveSignUp
	} = useSignUp();

	const createUserMutation = api.user.create.useMutation();

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

	async function verifyEmail({ code }: SignUpEmailVerify) {
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

	return {
		signUpUser,
		emailVerify,
		isSignUpLoaded,
		verifyEmail,
		resendCode,
		isLoading: createUserMutation.isPending
	};
}
