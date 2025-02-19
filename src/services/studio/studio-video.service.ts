import { instance } from '@/api/axios';

import type { IVideoFormData } from '@/types/studio-video.types';
import type { IVideo, IVideosPagination } from '@/types/video.types';

/**
 * Класс, представляющий сервис для работы с видео.
 */
class VideoService {
	private _baseUrl = '/studio/videos';

	getAllVideos(searchTerm?: string | null, page?: number, limit?: number) {
		return instance.get<IVideosPagination>(`${this._baseUrl}`, {
			params: {
				searchTerm,
				page,
				limit
			}
		});
	}

	byId(id: string) {
		return instance.get<IVideo>(`${this._baseUrl}/${id}`);
	}

	create(dto: IVideoFormData) {
		return instance.post(this._baseUrl, dto);
	}

	update(id: string, dto: IVideoFormData) {
		return instance.put(`${this._baseUrl}/${id}`, dto);
	}

	delete(id: string) {
		return instance.delete(`${this._baseUrl}/${id}`);
	}
}

export const studioVideoService = new VideoService();
