import { Flame } from 'lucide-react';
import type { Metadata } from 'next';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { PAGE } from '@/config/public-page.config';

import { ExploreSection } from './explore/ExploreSection';
import { videoService } from '@/services/video.service';
import type { IVideo } from '@/types/video.types';

export const revalidate = 100;

export const metadata: Metadata = {
	title: 'Yourvideo',
	description: ' Best videos in the world',
	alternates: {
		canonical: PAGE.HOME
	},
	openGraph: {
		type: 'website',
		title: 'Yourvideo',
		url: PAGE.HOME
	}
};

export default async function Page() {
	const data = await videoService.getTrendingVideos();

	const trendingVideos = data.data;

	return (
		<section>
			{!!trendingVideos?.length && (
				<section className='mb-10'>
					<SectionTitle Icon={Flame}>Trending</SectionTitle>
					<div className='grid-4-cols'>
						{trendingVideos.map((video: IVideo) => (
							<VideoItem
								key={video.id}
								video={video}
								Icon={Flame}
								isImagePriority
							/>
						))}
					</div>
				</section>
			)}
			<ExploreSection />
		</section>
	);
}
