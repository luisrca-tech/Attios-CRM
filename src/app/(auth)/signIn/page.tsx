import { SignInForm } from '~/features/auth/block/SignInForm';
import { AuthBackground } from '~/features/auth/components/ui/AuthBackground';
import signUpImage from '/public/images/signUpImage.png';

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
