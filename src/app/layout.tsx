import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { Providers } from '@/providers/Providers';

import './globals.scss';
import { SITE_URL } from '@/constants/constants'

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const fetchCache = 'default-cache';

export const metadata: Metadata = {
	title: {
		absolute: 'Yourvideo',
		template: '%s | Personal project'
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
			<body className={`flex justify-center ${notoSans.className}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
