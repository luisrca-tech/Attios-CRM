import { RecoverPassword } from '~/features/auth/components/block/RecoverPasswordForm';
import { AuthBackground } from '~/features/auth/components/ui/AuthBackground';
import ForgotPasswordImage from '/public/images/forgotPasswordImage.png';

export default function ForgotPassword() {
	return (
		<main className="flex max-h-screen items-center overflow-hidden">
			<div className="flex-1">
				<RecoverPassword />
			</div>
			<AuthBackground image={ForgotPasswordImage.src} />
		</main>
	);
}
