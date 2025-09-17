import * as m from 'framer-motion/m';
import { type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PAGE } from '@/config/public-page.config';

import { transformCount } from '@/utils/transform-count';
import { transformDate } from '@/utils/transform-date';

import { VideoChannelName } from './video-channel-name/VideoChannelName';
import { VideoItemTitle } from './video-item-title/VideoItemTitle';
import type { IVideo } from '@/types/video.types';

interface Props {
	video: IVideo;
	Icon?: LucideIcon;
	isImagePriority?: boolean
}

export function VideoItem({ video, Icon, isImagePriority }: Props) {
	return (
		<m.article
			initial={{
				scale: 0.5,
				opacity: 0,
				borderRadius: 6
			}}
			animate={{
				scale: 1,
				opacity: 1
			}}
			whileHover={{
				scale: 1.1,
				y: -5,
				boxShadow: '0px 0px 25px rgba(255, 255, 255, 0.137)'
			}}
			transition={{
				type: 'spring',
				// Жесткость
				stiffness: 500,
				// демпфирование
				damping: 30
			}}
		>
			<div className='relative mb-1.5'>
				<Link href={PAGE.VIDEO(video.publicId)}>
					<Image
						src={video.thumbnailUrl}
						width={431}
						height={364}
						alt={video.title}
						className='rounded-md w-full'
						quality={100}
						priority={isImagePriority}
					/>
				</Link>
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					className='absolute left-2 bottom-2'
				>
					<Image
						src={video.channel.avatarUrl}
						width={35}
						height={35}
						alt={video?.channel?.user?.name || ''}
						className='rounded-full shadow'
						priority={isImagePriority}
					/>
				</Link>
			</div>
			<div className='p-1'>
				<div className='mb-1.5 flex items-center justify-between'>
					<div className='flex items-center gap-0.5'>
						{Icon && (
							<Icon
								className='text-red-600'
								size={20}
							/>
						)}
						<span className='text-gray-400 text-sm'>{transformCount(video.viewsCount)} views</span>
					</div>
					<div>
						<span className='text-gray-400 text-xs'>{transformDate(video.createdAt)}</span>
					</div>
				</div>
				<div className='mb-1'>
					<VideoItemTitle
						publicId={video.publicId}
						title={video.title}
					/>
				</div>
				<div>
					<VideoChannelName channel={video.channel} />
				</div>
			</div>
		</m.article>
	);
}
