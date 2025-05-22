import { AuthBackground } from '~/features/auth/components/ui/AuthBackground';
import signInImage from '/public/images/signInImage.png';
import { headers } from 'next/headers';
import { getDisplaySubdomain } from '~/utils/subdomain';
import { ReturnButton } from './_components/ReturnButton';

export default function UnauthorizedSubdomain() {
	const headersList = headers();
	const host = headersList.get('host') ?? '';
	const displaySubdomain = getDisplaySubdomain(host);

	return (
		<main className="flex max-h-screen items-center overflow-hidden">
			<div className="flex-1 p-8">
				<div className="mx-auto max-w-md text-center">
					<h1 className='mb-4 font-bold text-2xl'>Unauthorized Access</h1>
					<p className="mb-6 text-gray-600">
						The subdomain{' '}
						<span className="font-semibold">{displaySubdomain}</span> is not
						authorized. Please contact your administrator or try a different
						subdomain.
					</p>
					<ReturnButton />
				</div>
			</div>
			<AuthBackground image={signInImage.src} />
		</main>
	);
}
