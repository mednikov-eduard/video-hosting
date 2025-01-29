import { Heart, ListPlus } from 'lucide-react';
import type { Metadata } from 'next';
import dynamicNext from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VerifiedItem } from '@/ui/verified-item/VerifiedItem';

import { PAGE } from '@/config/public-page.config';

import { stripHtml } from '@/utils/strip-html';
/* import type { TPageSlugProp } from '@/types/pages.types'; */
import { transformCount } from '@/utils/transform-count';

import { SimilarVideos } from './SimilarVideos';
import { videoService } from '@/services/video.service';
import type { ISingleVideoResponse } from '@/types/video.types';
import { VideoDescription } from '@/components/video-description/VideoDescription'

const DynamicSubscribeButton = dynamicNext(
	() => import('@/components/subscribe-button/SubscribeButton').then(mod => mod.SubscribeButton),
	{ ssr: true, loading: () => <SkeletonLoader classNames='w-36 h-10 rounded-md' /> }
);

export const revalidate = 100;
export const dynamic = 'force-static';

type tParams = Promise<{ publicId: string }>;

export async function generateMetadata(props: { params: tParams }): Promise<Metadata> {
	const { publicId } = await props.params;

	const data = await videoService.byPublicId(publicId);
	const video = data.data;

	return {
		title: video.title,
		description: stripHtml(video.description).slice(0, 150),
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl]
		}
	};
}

export async function generateStaticParams() {
	const { data } = await videoService.getAllVideos();

	return data.videos.map((video: ISingleVideoResponse) => ({ publicId: video.publicId }));
}

export default async function Page(props: { params: tParams }) {
	const { publicId } = await props.params;

	const data = await videoService.byPublicId(publicId);

	const video = data.data;

	return (
		<section className='grid grid-cols-[2.7fr_1fr] gap-10'>
			<div className=''>
				<div className='relative w-full h-[249px] rounded-3xl overflow-hidden shadow-md mb-6'>
					{/* <video src={video.videoFileName} /> */}
				</div>
				<div className='flex justify-between items-start  mb-6 pb-6 border-b border-border'>
					<div>
						<SectionTitle
							className='mb-1'
							classNameHeading='text-xl'
						>
							{video.title}
						</SectionTitle>
						<div className='text-gray-400'>{video.viewsCount.toLocaleString()} views</div>
					</div>
					<div className='flex items-center gap-7'>
						<button className='flex items-center gap-1 opacity-80 hover:opacity-100 transition'>
							<ListPlus size={20} />
							Save
						</button>
						<button className='flex items-center gap-2 text-primary opacity-80 hover:opacity-100 transition'>
							<Heart size={20} />
							{transformCount(video.likes.length)}
						</button>
					</div>
				</div>
				<div className='flex items-center justify-between mb-6'>
					<div className='flex gap-2.5  items-center'>
						<Link href={PAGE.CHANNEL(video.channel.slug)}>
							<Image
								alt={video.channel.user.name || ''}
								src={video.channel.avatarUrl}
								width={40}
								height={40}
								className='rounded flex-shrink-0 shadow'
								priority
							/>
						</Link>
						<div>
							<Link href={PAGE.CHANNEL(video.channel.slug)}>
								<SectionTitle
									className='mb-0'
									classNameHeading='text-lg'
								>
									<span className='flex items-center gap-2'>
										{video.channel.user.name}{' '}
										{video.channel.isVerified && <VerifiedItem size={14} />}
									</span>
								</SectionTitle>
							</Link>
							<div className=' text-gray-400 text-sm flex items-center gap-1'>
								{transformCount(video.channel.subscribers.length)} subscribers
							</div>
						</div>
					</div>
					<DynamicSubscribeButton slug={video.channel.slug} />
				</div>
				<VideoDescription description={video.description}/>
			</div>
			{!!video.similarVideos?.length && <SimilarVideos videos={video.similarVideos} />}
		</section>
	);
}
