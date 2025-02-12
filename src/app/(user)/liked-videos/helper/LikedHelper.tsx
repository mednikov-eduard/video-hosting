'use client';

import { Heart } from 'lucide-react';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { HorizontalVideoItem } from '@/ui/video-item/HorizontalVideoItem';

import { useProfile } from '@/hooks/useProfile';

export function LikedHelper() {
	const { profile, isLoading } = useProfile();

	return (
		<section className='max-w-screen-lg'>
			<div className=' mb-10 flex gap-8 items-center'>
				<SectionTitle
					Icon={Heart}
					isPageHeading
					className='mb-0'
				>
					Liked videos
				</SectionTitle>
				{!!profile?.likes?.length && <span>{profile?.likes?.length} videos</span>}
			</div>
			<div>
				{isLoading ? (
					<SkeletonLoader classNames='h-28 mb-6 rounded-md' />
				) : profile?.likes?.length ? (
					profile?.likes?.map((like, index) => (
						<HorizontalVideoItem
							key={like.video.id}
							video={like.video}
							itemDelay={index / 10}
						/>
					))
				) : (
					<p>Liked video not found!</p>
				)}
			</div>
		</section>
	);
}
