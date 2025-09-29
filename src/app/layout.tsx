import type { Metadata, Viewport } from 'next';
import { Noto_Sans } from 'next/font/google';

import { Providers } from '@/providers/Providers';

import { COLORS } from '@/constants/colors.constants';
import { SITE_NAME, SITE_URL } from '@/constants/constants';

import './globals.scss';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const fetchCache = 'default-cache';

export const metadata: Metadata = {
	icons: {
		icon: '/logo.svg',
		shortcut: '/logo.svg',
		apple: '/256.png',
		other: {
			rel: 'touch-icons',
			url: '/256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},
	title: {
		absolute: `${SITE_NAME}`,
		template: '%s | Personal project'
	},
	description: 'Best app to watch videos',
	openGraph: {
		type: 'website',
		siteName: 'localhost',
		emails: ['eduardmedh@yandex.ru'],
		images: [
			{
				url: '/og.jpg',
				width: 909,
				height: 500,
				alt: `${SITE_NAME}`
			}
		]
	},
	metadataBase: new URL(SITE_URL),
	applicationName: `${SITE_NAME}`,
	authors: {
		name: 'Eduard Mednikov',
		url: 'https://github.com/mednikov-eduard'
	},
	manifest: '/manifest.json',
	publisher: 'Eduard Mednikov',
	formatDetection: {
		telephone: false
	}
};

export const viewport: Viewport = {
	themeColor: COLORS.bg
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
