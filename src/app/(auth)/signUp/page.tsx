import { SignUpForm } from '~/features/auth/block/SignUpForm';
import { AuthBackground } from '~/features/auth/components/ui/AuthBackground';
import signUpImage from '/public/images/signUpImage.png';

export default function SignUp() {
	return (
		<main className="flex max-h-screen items-center overflow-hidden">
			<div className="flex-1">
				<SignUpForm />
			</div>
			<AuthBackground image={signUpImage.src} />
		</main>
	);
}
