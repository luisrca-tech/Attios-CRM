'use client';

import { SignInForm } from '~/features/auth/components/block/SignInForm';
import { AuthBackground } from '~/features/auth/components/ui/AuthBackground';
import signInImage from '/public/images/signInImage.png';

export default function SignIn() {
	return (
		<main className="flex max-h-screen items-center overflow-hidden">
			<div className="flex-1">
				<SignInForm />
			</div>
			<AuthBackground image={signInImage.src} />
		</main>
	);
}
