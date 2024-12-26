'use client';

import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { videoService } from '@/services/video.service';
import type { IVideo } from '@/types/video.types';

export function SearchHelper() {
	const searchParams = useSearchParams();

	const { data, isLoading } = useQuery({
		queryKey: ['search', searchParams.get('term')],
		queryFn: () => videoService.getAllVideos(searchParams.get('term'))
	});

	return (
		<section>
			<SectionTitle
				Icon={Search}
				isH1
			>
				Search by {searchParams.get('term')}
			</SectionTitle>
			<div className='grid grid-cols-6 gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						classNames='h-40 rounded-md'
					/>
				) : data?.data.videos.length ? (
					data.data.videos.map((video: IVideo) => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>No results found</p>
				)}
			</div>
		</section>
	);
}
