import { Gamepad2 } from 'lucide-react';
import type { Metadata } from 'next';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { PAGE } from '@/config/public-page.config';

import { videoService } from '@/services/video.service';
import type { IVideo } from '@/types/video.types';

export const revalidate = 100;

export const metadata: Metadata = {
	title: 'Video Games',
	description: ' Best video games the world ',
	alternates: {
		canonical: PAGE.VIDEO_GAMES
	},
	openGraph: {
		type: 'website',
		title: 'Trending',
		url: PAGE.VIDEO_GAMES
	}
};

export default async function Page() {
	const data = await videoService.getVideoGames();

	const videoGames = data?.data.videos;

	return (
		<section>
			<SectionTitle Icon={Gamepad2}>Video games</SectionTitle>
			<div className='grid-4-cols'>
				{!!videoGames?.length ? (
					videoGames.map((video: IVideo) => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<div>Video games are temporarily unavailable</div>
				)}
			</div>
		</section>
	);
}
