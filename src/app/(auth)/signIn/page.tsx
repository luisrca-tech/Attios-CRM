import { AuthBackground } from '~/features/auth/components/AuthBackground';
import signUpImage from '/public/images/signUpImage.png';
import { SignInForm } from '~/features/auth/block/SignInForm';

export default function SignIn() {
	return (
		<main className="flex max-h-screen items-center overflow-hidden">
			<div className="flex-1">
				<SignInForm />
			</div>
			<AuthBackground image={signUpImage.src} />
		</main>
	);
}
