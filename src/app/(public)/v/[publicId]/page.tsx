import type { Metadata } from 'next';

import { SingleVideos } from '@/ui/single-videos/SingleVideos';

import { stripHtml } from '@/utils/strip-html';

import { videoService } from '@/services/video.service';
import type { TPagePublicIdProp } from '@/types/page.types';

export const revalidate = 100;

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
	const publicId = (await params).publicId;

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

	return data.videos.map(video => ({ publicId: video.publicId }));
}

export default async function Page({ params }: TPagePublicIdProp) {
	const publicId = (await params).publicId;

	const data = await videoService.byPublicId(publicId);
	const video = data.data;

	return <SingleVideos video={video} />;
}
