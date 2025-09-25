'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Compass } from 'lucide-react';
import { useEffect } from 'react';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { useAuth } from '@/hooks/useAuth';

import { videoService } from '@/services/video.service';
import { useEffectScroll } from '@/hooks/useEffectScroll'

export function Explore() {
	const { user } = useAuth();

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['explore'],
		queryFn: ({ pageParam }) =>
			videoService.getExploreVideos(
				user?.id,
				{
					page: pageParam.page,
					limit: 12
				},
				pageParam.excludeIds
			),
		initialPageParam: { page: 1, excludeIds: [] as string[] },
		getNextPageParam: (lastPage, allPages) => {
			const { page, totalPages } = lastPage;
			const allVideoIds = allPages.flatMap(page => page.videos.map(video => video.id));

			return page < totalPages ? { page: page + 1, excludeIds: allVideoIds } : undefined;
		}
	});

	useEffectScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	});

	const allVideos = data?.pages.flatMap(page => page.videos) || [];

	return (
		<section className='grid-4-cols pb-5'>
			{isLoading && !allVideos.length ? (
				<SkeletonLoader
					count={6}
					classNames='h-36 rounded-md'
				/>
			) : (
				allVideos.map(video => (
					<VideoItem
						key={video.id}
						video={video}
					/>
				))
			)}

			{isFetchingNextPage && (
				<SkeletonLoader
					count={6}
					classNames='h-36 rounded-md'
				/>
			)}
		</section>
	);
}
