'use client'

import { useQuery } from '@tanstack/react-query'

import { VideoItem } from '@/ui/video-item/VideoItem'

import { videoService } from '@/services/video.service'
import { Flame } from 'lucide-react'

export default function Home() {
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})

	console.log(data?.data.videos);
	

	return (
		<div className='grid grid-cols-6 gap-6'>
			{isLoading
				? 'Loading...'
				: data?.data.videos.length &&
					data.data.videos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
							Icon={Flame}
						/>
					))}
		</div>
	)
}
