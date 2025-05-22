'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '~/common/components/ui/Button';
import ErrorMessage from '~/common/components/ui/ErrorMessage';
import { Icon } from '~/common/components/ui/Icons/_index';
import { Input } from '~/common/components/ui/Input';
import { useAuth } from '../../hook/useAuth';
import { signInFormSchema } from '../../schemas/signInForm.schema';
import type { SignInFormType } from '../../types/signInForm.type';
import { WelcomeHeading } from '../ui/WelcomeHeading';
import { getSubdomain } from '~/utils/subdomain';

type SubdomainSignInFormProps = {
	subdomain: string;
};

export function SubdomainSignInForm({ subdomain }: SubdomainSignInFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting }
	} = useForm<SignInFormType>({
		resolver: zodResolver(signInFormSchema),
		mode: 'onChange'
	});
	const { signInUser, isSignInLoaded } = useAuth();

	if (!isSignInLoaded) return null;

	async function onSubmit({ email, password }: SignInFormType) {
		const success = await signInUser({ email, password });
		if (success) {
			const domain = getSubdomain(subdomain);
			window.location.href = domain;
		}
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<WelcomeHeading
				title={`Welcome to ${subdomain}'s workspace`}
				subtitle="Sign in to access your team's workspace"
			/>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-[22.8125rem] flex-col gap-2"
			>
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
				<div className="mt-3 flex flex-col gap-3">
					<Button isLoading={isSubmitting} type="submit" className="w-full">
						Sign In
					</Button>
				</div>
			</form>
		</div>
	);
}
