import { SignInForm } from '~/features/auth/components/block/SignInForm';
import { SubdomainSignInForm } from '~/features/auth/components/block/SubdomainSignInForm';
import { AuthBackground } from '~/features/auth/components/ui/AuthBackground';
import signInImage from '/public/images/signInImage.png';
import { headers } from 'next/headers';
import { getDisplaySubdomain, getSubdomain } from '~/utils/subdomain';
import { api } from '~/trpc/server';
import { redirect } from 'next/navigation';

export default async function SignIn() {
	const headersList = headers();
	const host = headersList.get('host') ?? '';
	const displaySubdomain = getDisplaySubdomain(host);

	const subdomain = await api.subdomain.getBySubdomain({
		subDomain: displaySubdomain ?? ''
	});

	const isSubdomainSignIn = !!displaySubdomain;

	if (subdomain?.subDomain !== displaySubdomain) {
		redirect(`${getSubdomain(displaySubdomain ?? '')}/unauthorized-subdomain`);
	}

	return (
		<main className="flex max-h-screen items-center overflow-hidden">
			<div className="flex-1">
				{isSubdomainSignIn && displaySubdomain ? (
					<SubdomainSignInForm subdomain={displaySubdomain} />
				) : (
					<SignInForm />
				)}
			</div>
			<AuthBackground image={signInImage.src} />
		</main>
	);
}
