import { instance } from '@/api/axios';

import type { IFullVideo } from '@/types/video.types';

class WatchHistoryService {
	private _baseUrl = '/watch-history';

	getHistory() {
		return instance.get<{ video: IFullVideo }[]>(this._baseUrl);
	}

	updateHistory(videoId: string) {
		return instance.post<{ video: IFullVideo }[]>(this._baseUrl, { videoId });
	}

	clearHistory() {
		return instance.delete<{ video: IFullVideo }[]>(this._baseUrl);
	}
}

export const watchHistoryService = new WatchHistoryService();
