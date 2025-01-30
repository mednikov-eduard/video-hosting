import type { Metadata } from 'next';

import { VideoDescription } from '@/components/video-description/VideoDescription';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { VideoActions } from '@/ui/video-actions/VideoActions';
import { VideoChannelInfo } from '@/ui/video-channel-info/VideoChannelInfo';

import { stripHtml } from '@/utils/strip-html';

import { SimilarVideos } from './SimilarVideos';
import { videoService } from '@/services/video.service';
import type { ISingleVideoResponse } from '@/types/video.types';

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
		<section className='grid grid-cols-[3fr_1fr] gap-20'>
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
			</div>
			{!!video.similarVideos?.length && <SimilarVideos videos={video.similarVideos} />}
		</section>
	);
}
