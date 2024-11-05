'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '~/common/components/ui/Button';
import ErrorMessage from '~/common/components/ui/ErrorMessage';
import { Icon } from '~/common/components/ui/Icons';
import { Input } from '~/common/components/ui/Input';
import { SignUpEmailVerify } from '../components/SignUpEmailVerify';
import { SocialAuth } from '../components/SocialAuth';
import { WelcomeHeading } from '../components/WelcomeHeading';
import { useAuth } from '../hook/useAuth';
import { signUpFormSchema } from '../schemas/signUpForm.schema';
import type { SignUpFormType } from '../types/signUpForm.type';

export function SignUpForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful, isSubmitted }
	} = useForm<SignUpFormType>({
		resolver: zodResolver(signUpFormSchema),
		mode: 'onChange'
	});
	const { signUpUser, emailVerify, isSignUpLoaded } = useAuth();

	if (!isSignUpLoaded) return null;

	async function onSubmit({ email, password, fullName }: SignUpFormType) {
		await signUpUser({ email, password, fullName });
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<WelcomeHeading
				title="Welcome to our CRM. Sign Up to getting started."
				subtitle="Enter your details to proceed further"
			/>
			{!emailVerify && (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex w-[22.8125rem] flex-col gap-4"
				>
					<Input.Root
						error={!!errors.fullName?.message}
						isValid={isSubmitSuccessful}
						fieldText="Full Name"
					>
						<Input.Text
							type="text"
							placeholder="John Doe"
							renderIconRight={() => <Icon.User />}
							{...register('fullName')}
						/>
					</Input.Root>
					{errors.fullName?.message && isSubmitted && (
						<ErrorMessage>{errors.fullName.message}</ErrorMessage>
					)}
					<Input.Root
						error={!!errors.email?.message}
						isValid={isSubmitSuccessful}
						fieldText="Email"
					>
						<Input.Text
							placeholder="Johndoe@example.com"
							renderIconRight={() => <Icon.Email />}
							{...register('email')}
						/>
					</Input.Root>
					{errors.email?.message && isSubmitted && (
						<ErrorMessage>{errors.email.message}</ErrorMessage>
					)}
					<Input.Root
						error={!!errors.password?.message}
						isValid={isSubmitSuccessful}
						fieldText="Password"
					>
						<Input.Password
							placeholder="********"
							{...register('password')}
							className="h-full w-full p-2 font-bold text-black text-sm leading-5 placeholder:text-primary-200 focus:border-white-400 focus:outline-white-400"
						/>
					</Input.Root>
					{errors.password?.message && isSubmitted && (
						<ErrorMessage>
							<p>{errors.password.message}</p>
						</ErrorMessage>
					)}
					<div className="mt-3 flex gap-2">
						<Button className="w-full" type="submit">
							Sign Up
						</Button>
						<Button color="secondary" className="w-full">
							Sign In
						</Button>
					</div>
				</form>
			)}
			{emailVerify && <SignUpEmailVerify />}
			<SocialAuth />
		</div>
	);
}
