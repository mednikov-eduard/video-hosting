import { Flame } from 'lucide-react'
import type { Metadata } from 'next'

import { SectionTitle } from '@/ui/section-title/SectionTitle'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { PAGE } from '@/config/public-page.config'

import { Explore } from './explore/Explore'
import { videoService } from '@/services/video.service'
import type { IVideo } from '@/types/video.types'

export const revalidate = 100
export const dynamic = 'force-static'

export const metadata: Metadata = {
	title: 'Youtube 2',
	description: ' Best videos in the world',
	alternates: {
		canonical: PAGE.HOME
	},
	openGraph: {
		type: 'website',
		title: 'Youtube 2',
		url: PAGE.HOME
	}
}

export default async function Home() {
	const data = await videoService.getTrendingVideos()

	const trendingVideos = data.data

	return (
		<section>
			<section className='mb-10'>
				<SectionTitle Icon={Flame}>Trending</SectionTitle>
				<div className='grid grid-cols-6 gap-6'>
					{!!trendingVideos?.length &&
						trendingVideos.map((video: IVideo) => (
							<VideoItem
								key={video.id}
								video={video}
								Icon={Flame}
							/>
						))}
				</div>
			</section>
			<Explore />
		</section>
	)
}
