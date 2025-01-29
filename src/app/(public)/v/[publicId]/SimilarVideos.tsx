import { Video } from 'lucide-react';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { VideoItem } from '@/ui/video-item/VideoItem';

import type { ISingleVideoResponse, IVideo } from '@/types/video.types';

export function SimilarVideos({ videos }: { videos: ISingleVideoResponse['similarVideos'] }) {
	return (
		<section className='mb-10'>
			<SectionTitle Icon={Video}>Similar</SectionTitle>
			<div className='grid grid-cols-1 gap-y-3'>
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
