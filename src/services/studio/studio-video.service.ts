import { instance } from '@/api/axios';

import type { IPaginationParams } from '@/types/pagination.types';
import type { IVideoFormData } from '@/types/studio-video.types';
import type { IStudioVideoResponse, IVideosPagination } from '@/types/video.types';

/**
 * Класс, представляющий сервис для работы с видео.
 */
class VideoService {
	private _baseUrl = '/studio/videos';

	async getAllVideos(params?: IPaginationParams) {
		const res = await instance.get<IVideosPagination>(`${this._baseUrl}`, {
			params
		})
		return res.data
	}

	byId(id: string) {
		return instance.get<IStudioVideoResponse>(`${this._baseUrl}/${id}`);
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
