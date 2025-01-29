import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { Providers } from '@/providers/Providers';

import './globals.scss';
import { SITE_URL } from '@/constants/constants'

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		absolute: 'Youtube',
		template: '%s | Course project'
	},
	description: 'Best app to watch videos',
	metadataBase: new URL(SITE_URL)
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.className}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
