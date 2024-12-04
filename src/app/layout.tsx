import '~/styles/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';
import { lato } from '~/assets/fonts/lato';
import { TRPCReactProvider } from '~/trpc/react';

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<html lang="pt-BR" className={`${lato.className}`}>
				<body>
					<NuqsAdapter>
						<TRPCReactProvider>
							{children}
							<Toaster richColors />
						</TRPCReactProvider>
					</NuqsAdapter>
				</body>
			</html>
		</ClerkProvider>
	);
}
