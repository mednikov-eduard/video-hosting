'use client';

import { useQuery } from '@tanstack/react-query';
import { ListVideo } from 'lucide-react';
import { useParams } from 'next/navigation';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { playlistService } from '@/services/playlists.service';

export function SinglePlaylist() {
	const { id } = useParams();

	const { data, isLoading } = useQuery({
		queryKey: ['playlist', id],
		queryFn: () => playlistService.getPlaylistById(id as string),
		enabled: !!id
	});

	return (
		<section>
			<SectionTitle
				Icon={ListVideo}
				isPageHeading
			>
				{data?.data.title}
			</SectionTitle>
			<div className='grid grid-cols-6 gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						classNames='h-40 rounded-md'
					/>
				) : data?.data?.videos?.length ? (
					data?.data?.videos?.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>Videos in playlist not found</p>
				)}
			</div>
		</section>
	);
}
