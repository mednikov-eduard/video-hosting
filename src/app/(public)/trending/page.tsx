import type { Metadata } from 'next'

import { PAGE } from '@/config/public-page.config'

export const metadata: Metadata = {
	title: 'Trending',
	description: ' Trending videos the world',
	alternates: {
		canonical: PAGE.TRENDING
	},
	openGraph: {
		type: 'website',
		title: 'Trending',
		url: PAGE.TRENDING
	}
}

export default function Page() {
	return <div>Trending</div>
}
