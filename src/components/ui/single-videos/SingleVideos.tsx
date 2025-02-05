'use client';

import cn from 'clsx';
import { useState } from 'react';


import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { VideoActions } from '@/ui/video-actions/VideoActions';
import { VideoChannelInfo } from '@/ui/video-channel-info/VideoChannelInfo';
import { VideoPlayer } from '@/ui/video-player/VideoPlayer';

import { SimilarVideos } from '../similar-videos/SimilarVideos';

import type { ISingleVideoResponse } from '@/types/video.types';
import { VideoDescription } from '../video-description/VideoDescription'
import { Comments } from '../comments/Comments'

interface Props {
	video: ISingleVideoResponse;
}

export function SingleVideos({ video }: Props) {
	const [isTheaterMode, setIsTheaterMode] = useState(false);

	return (
		<section className='grid gap-10 grid-cols-[3fr_.8fr] relative'>
			<div>
				<div className={cn(isTheaterMode ? 'absolute top-0 left-0 w-full' : 'relative mb-6')}>
					<VideoPlayer
						fileName={video.videoFileName}
						toggleTheaterMode={() => {
							setIsTheaterMode(!isTheaterMode);
						}}
						maxResolution={video.maxResolution}
					/>
				</div>

				<div
					className={cn('flex justify-between items-start pb-6 mb-6 border-b border-border', {
						'pt-[58.5rem]': isTheaterMode
					})}
				>
					<div>
						<SectionTitle
							className='mb-1'
							isH1
							classNameHeading='text-xl'
						>
							{video.title}
						</SectionTitle>
						<div className='text-gray-400'>{video.viewsCount.toLocaleString()} views</div>
					</div>
					<VideoActions
						likesCount={video.likes.length}
						videoId={video.id}
					/>
				</div>
				<VideoChannelInfo
					slug={video.channel.slug}
					userName={video.channel.user.name}
					avatarUrl={video.channel.avatarUrl}
					isVerified={video.channel.isVerified}
					subscribers={video.channel.subscribers.length}
				/>
				<VideoDescription description={video.description} />

				<Comments video={video} />
			</div>
			{!!video.similarVideos?.length && (
				<div
					className={cn({
						'pt-[58.5rem]': isTheaterMode
					})}
				>
					<SimilarVideos videos={video.similarVideos} />
				</div>
			)}
		</section>
	);
}
