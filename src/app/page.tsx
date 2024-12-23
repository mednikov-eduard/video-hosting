import { Flame } from 'lucide-react'

import { VideoItem } from '@/ui/video-item/VideoItem'

import { Explore } from './explore/Explore'
import { videoService } from '@/services/video.service'
import type { IVideo } from '@/types/video.types'

export const revalidate = 100
export const dynamic = 'force-static'

export default async function Home() {
	const data = await videoService.getTrendingVideos()

	const trendingVideos = data.data

	return (
		<>
			<section className='mb-10'>
				<h2>Trending</h2>
				<div className='grid grid-cols-6 gap-6'>
					{trendingVideos?.length &&
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
		</>
	)
}
