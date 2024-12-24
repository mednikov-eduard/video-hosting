import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { Layout } from '@/components/layout/layout'

import { Providers } from '@/providers/Providers'

import './globals.scss'

const notoSans = Noto_Sans({subsets: ['latin']})

export const metadata: Metadata = {
	title: {
		absolute: 'Youtube',
		template: '%s | Course project',
	},
	description: 'Best app to watch videos'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.className}`}>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	)
}
