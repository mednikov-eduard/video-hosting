'use client';

import { Heart } from 'lucide-react';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { useProfile } from '@/hooks/useProfile';

export function SubHelper() {
	const { profile, isLoading } = useProfile();

	return (
		<section>
			<SectionTitle
				Icon={Heart}
				isPageHeading
			>
				Subscriptions
			</SectionTitle>
			<div className='grid grid-cols-6 gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						classNames='h-40 rounded-md'
					/>
				) : profile?.subscribedVideos?.length ? (
					profile?.subscribedVideos?.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>You have not subscribed yet</p>
				)}
			</div>
		</section>
	);
}
