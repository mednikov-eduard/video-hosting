'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { History } from 'lucide-react';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { HorizontalVideoItem } from '@/ui/video-item/HorizontalVideoItem';

import { watchHistoryService } from '@/services/watch-history.service';

export function HistoryHelper() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['watch history'],
		queryFn: () => watchHistoryService.getHistory()
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ['clear watch history'],
		mutationFn: () => watchHistoryService.clearHistory(),
		onSuccess: () => {
			refetch();
		}
	});

	const watchHistory = data?.data;

	return (
		<section className='w-full  px-4'>
			<div className='flex justify-between'>
				<SectionTitle
					Icon={History}
					isPageHeading
					className='mb-4'
				>
					Watch history
				</SectionTitle>
				<button
					className='bg-border font-medium rounded h-max p-2.5 opacity-80 hover:opacity-100 transition-opacity'
					disabled={isPending}
					onClick={() => mutate()}
				>
					{isPending ? 'Clearing...' : 'Clear history'}
				</button>
			</div>
			<div className='max-w-screen-lg'>
				{isLoading ? (
					<SkeletonLoader classNames='h-28 mb-6 rounded-md' />
				) : watchHistory?.length ? (
					watchHistory?.map((history, index) => (
						<HorizontalVideoItem
							key={history.video.id}
							video={history.video}
							itemDelay={index / 10}
						/>
					))
				) : (
					<p>Watch history not found!</p>
				)}
			</div>
		</section>
	);
}
