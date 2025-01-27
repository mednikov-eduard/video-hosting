import { Video } from 'lucide-react';
import type { Metadata } from 'next';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { PAGE } from '@/config/public-page.config';

import { channelService } from '@/services/channel.service';
import type { TPageSlugProp } from '@/types/pages.types';
import type { IVideo } from '@/types/video.types';

export const revalidate = 100;
export const dynamic = 'force-static';

export const metadata: Metadata = {
	title: 'Youtube 2',
	description: ' Best videos in the world',
	alternates: {
		canonical: PAGE.HOME
	},
	openGraph: {
		type: 'website',
		title: 'Youtube 2',
		url: PAGE.HOME
	}
};

export default async function Page({ params: { slug } }: TPageSlugProp) {
	const data = await channelService.bySlug(slug);

	const channel = data.data;

	return (
		<section>
			{!!channel.videos?.length && (
				<section className='mb-10'>
					<SectionTitle Icon={Video}>Videos</SectionTitle>
					<div className='grid-6-cols'>
						{channel.videos.map((video: IVideo) => (
							<VideoItem
								key={video.id}
								video={video}
							/>
						))}
					</div>
				</section>
			)}
		</section>
	);
}
