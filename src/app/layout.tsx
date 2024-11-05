import '~/styles/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';
import { TRPCReactProvider } from '~/trpc/react';

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<html lang="pt-BR" className={`${GeistSans.variable}`}>
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