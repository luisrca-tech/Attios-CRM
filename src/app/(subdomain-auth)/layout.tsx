import '~/styles/globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { api } from '~/trpc/server';
import { getDisplaySubdomain, getSubdomain } from '~/utils/subdomain';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export const metadata: Metadata = {
	title: 'Attios',
	description:
		'Attios CRM: Sell products and services, manage your leads, and allow them to search for offerings with ease.',
	icons: [{ rel: 'icon', url: '/favicon.svg' }]
};

export default async function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	const { userId } = await auth();
	const headersList = headers();
	const host = headersList.get('host') ?? '';
	const displaySubdomain = getDisplaySubdomain(host);

	if (!displaySubdomain) {
		redirect('/sign-in');
	}

	const subdomain = await api.subdomain.getBySubdomain({
		subDomain: displaySubdomain
	});

	if (subdomain?.subDomain !== displaySubdomain) {
		redirect(`${getSubdomain(displaySubdomain)}/unauthorized-subdomain`);
	}

	if (userId) {
		const user = await api.user.getUserById(userId);
		if (user?.subDomains?.subDomain === displaySubdomain) {
			redirect(getSubdomain(displaySubdomain));
		}
	}

	return <>{children}</>;
}
