import * as m from 'framer-motion/m';
import parse from 'html-react-parser';
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
	itemDelay: number
}

export function HorizontalVideoItem({ video, itemDelay }: Props) {
	return (
		<m.article
			initial={{
				x: -10,
				opacity: 0,
				borderRadius: 6
			}}
			animate={{
				x: 0,
				opacity: 1,
				transition: {
					delay: itemDelay
				}
			}}
			whileHover={{
				scale: 1.01,
				boxShadow: '0px 0px 25px rgba(255, 255, 255, 0.137)'
			}}
			transition={{
				type: 'spring',
				// Жесткость
				stiffness: 500,
				// демпфирование
				damping: 30
			}}
			className='  mb-5'
		>
			<div className='flex items-start gap-4 '>
				<Link
					href={PAGE.VIDEO(video.publicId)}
					className='shrink-0'
				>
					<Image
						src={video.thumbnailUrl}
						width={240}
						height={149}
						alt={video.title}
						className='rounded-md'
						quality={100}
					/>
				</Link>
				<div className='p-1'>
					<div className='mb-1 text-lg'>
						<VideoItemTitle
							publicId={video.publicId}
							title={video.title}
						/>
					</div>
					<div className='flex items-center gap-2 mb-1'>
						<VideoChannelName
							channel={video.channel}
							spanClassName='text-base mr-0.5'
						/>
						<span>•</span>
						<span className='text-gray-400 text-sm'>{transformCount(video.viewsCount)} views</span>
						<span>•</span>
						<span className='text-gray-400 text-sm'>{transformDate(video.createdAt)}</span>
					</div>
					<div>
						<span className='line-clamp-2'>{parse(video.description)}</span>
					</div>
				</div>
			</div>
		</m.article>
	);
}
