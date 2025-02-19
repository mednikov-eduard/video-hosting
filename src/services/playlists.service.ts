import { instance } from '@/api/axios';

import type { IPlaylist, IPlaylistData } from '@/types/playlist.types';

class PlaylistService {
	private _baseUrl = '/playlists';

	getUserPlaylist() {
		return instance.get<IPlaylist[]>(this._baseUrl);
	}

	getPlaylistById(playlistId: string) {
		return instance.get<IPlaylist>(`${this._baseUrl}/${playlistId}`);
	}

	toggleVideoInPlaylist(playlistId: string, videoId: string) {
		return instance.post<IPlaylist>(`${this._baseUrl}/${playlistId}/toggle-video`, {
			videoId
		});
	}

	createInPlaylist(IPlaylist: IPlaylistData) {
		return instance.post<IPlaylist>(this._baseUrl, IPlaylist);
	}
}

export const playlistService = new PlaylistService();
