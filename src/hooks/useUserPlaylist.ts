import { useQuery } from '@tanstack/react-query';

import { playlistService } from '@/services/playlists.service';

export function useUserPlaylist() {
	return useQuery({
		queryKey: ['playlist'],
		queryFn: () => playlistService.getUserPlaylist()
	});
}
