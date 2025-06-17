import { Button } from '~/common/components/ui/Button';
import { Icon } from '~/common/components/ui/Icons/_index';
import { useAuth } from '../../hook/useAuth';

export function SocialAuth() {
	const { signInWithFacebook, signInWithGoogle } = useAuth();

	return (
		<div className="mt-[4.8125rem] flex items-center gap-[0.375rem]">
			<Button disabled variant="outlined" color="secondary">
				<Icon.Social.Twitter />
			</Button>
			<Button onClick={signInWithGoogle} variant="outlined" color="secondary">
				<Icon.Social.Google />
			</Button>
			<Button onClick={signInWithFacebook} variant="outlined" color="secondary">
				<Icon.Social.Facebook />
			</Button>
			<span className="font-normal text-primary-200 text-sm leading-5">
				Or sign in with
			</span>
		</div>
	);
}
