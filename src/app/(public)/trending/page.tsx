import { Flame } from 'lucide-react';
import type { Metadata } from 'next';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { PAGE } from '@/config/public-page.config';

import { videoService } from '@/services/video.service';
import type { IVideo } from '@/types/video.types';

export const revalidate = 100;

export const metadata: Metadata = {
	title: 'Trending',
	description: ' Trending videos the world',
	alternates: {
		canonical: PAGE.TRENDING
	},
	openGraph: {
		type: 'website',
		title: 'Trending',
		url: PAGE.TRENDING
	}
};

export default async function Page() {
	const data = await videoService.getTrendingVideos();

	const trendingVideos = data?.data;

	return (
		<section>
			<SectionTitle Icon={Flame}>Trending</SectionTitle>
			<div className='grid-4-cols'>
				{!!trendingVideos?.length ? (
					trendingVideos.map((video: IVideo) => (
						<VideoItem
							key={video.id}
							video={video}
							Icon={Flame}
						/>
					))
				) : (
					<div>Trends are temporarily unavailable</div>
				)}
			</div>
		</section>
	);
}
