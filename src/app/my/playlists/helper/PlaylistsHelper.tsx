'use client';

import { useQuery } from '@tanstack/react-query';
import { ListVideo } from 'lucide-react';

import { Button } from '@/ui/button/Button';
import { CreatePlaylist } from '@/ui/create-playlist/CreatePlaylist';
import { PlaylistItem } from '@/ui/playlist-item/PlaylistItem';
import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { HorizontalVideoItem } from '@/ui/video-item/HorizontalVideoItem';

import { useOutside } from '@/hooks/useOutside';

import { playlistService } from '@/services/playlists.service';

export function PlaylistsHelper() {
	const { isShow, ref, setIsShow } = useOutside(false);

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['playlist'],
		queryFn: () => playlistService.getUserPlaylist()
	});

	return (
		<section>
			<div className='flex justify-between items-center mb-10'>
				<SectionTitle
					isPageHeading
					Icon={ListVideo}
					className='mb-0'
				>
					Playlist
				</SectionTitle>
				<Button
					variant='secondary'
					onClick={() => setIsShow(true)}
				>
					Create a playlist
				</Button>
			</div>
			<div className='grid grid-cols-5 gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						classNames='h-28 mb-6 rounded-md'
					/>
				) : data?.data?.length ? (
					data?.data?.map((playlist, index) => (
						<PlaylistItem
							key={playlist.id}
							playlist={playlist}
						/>
					))
				) : (
					<p>Playlists not found!</p>
				)}
			</div>

			{isShow && (
				<CreatePlaylist
					refetch={refetch}
					onClose={() => setIsShow(false)}
					ref={ref}
				/>
			)}
		</section>
	);
}
