import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { Check, ListPlus } from 'lucide-react';

import { useOutside } from '@/hooks/useOutside';
import { useUserPlaylist } from '@/hooks/useUserPlaylist';

import { playlistService } from '@/services/playlists.service';

interface Props {
	videoId: string;
}

export function SaveToPlaylist({ videoId }: Props) {
	const { data, refetch } = useUserPlaylist();

	const { isShow, setIsShow, ref } = useOutside(false);

	const { mutate, isPending } = useMutation({
		mutationKey: ['toggle video', videoId],
		mutationFn: (playlistId: string) => playlistService.toggleVideoInPlaylist(playlistId, videoId),
		async onSuccess() {
			const { toast } = await import('react-hot-toast');
			toast.success('Successfully changed!', {
				id: 'playlist'
			});

			setIsShow(false);
			refetch();
		}
	});

	return (
		<div
			className='relative z-10'
			ref={ref}
		>
			<button
				onClick={() => setIsShow(!isShow)}
				className='flex items-center gap-1 opacity-80 hover:opacity-100 transition'
			>
				<ListPlus size={20} />
				Save
			</button>
			<AnimatePresence>
				{isShow && (
					<m.ul
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: -10 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
						className='bg-bg/90 py-2 px-4 rounded absolute bottom-full right-0 shadow'
					>
						{data?.data.map(playlist => (
							<li
								key={playlist.id}
								className='mb-1'
							>
								<button
									onClick={() => {
										mutate(playlist.id);
									}}
									className={
										'border-b border-b-transparent transition-colors hover:text-primary flex items-center gap-1 min-w-[120px]'
									}
									disabled={isPending}
								>
									{playlist.videos.some(video => video.id === videoId) && <Check size={20} />}
									{playlist.title}
								</button>
							</li>
						))}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	);
}
