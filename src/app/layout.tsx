import '~/styles/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';
import { TRPCReactProvider } from '~/trpc/react';
import { lato } from '~/assets/fonts/lato';

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<html lang="pt-BR" className={`${lato.className}`}>
				<body>
					<TRPCReactProvider>
						{children}
						<Toaster richColors />
					</TRPCReactProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
