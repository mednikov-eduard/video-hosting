import { Video } from 'lucide-react';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { VideoItem } from '@/ui/video-item/VideoItem';

import type { IChannel } from '@/types/channel.types';
import type { IVideo } from '@/types/video.types';

export function ChannelVideos({ videos }: { videos: IChannel['videos'] }) {
	return (
		<section className='mb-10'>
			<SectionTitle Icon={Video}>Videos</SectionTitle>
			<div className='grid-6-cols'>
				{videos.map((video: IVideo) => (
					<VideoItem
						key={video.id}
						video={video}
					/>
				))}
			</div>
		</section>
	);
}
