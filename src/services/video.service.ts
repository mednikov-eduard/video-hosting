import { axiosClassic } from '@/api/axios';

import type { ISingleVideoResponse, IVideo, IVideosPagination } from '@/types/video.types';

/**
 * Класс, представляющий сервис для работы с видео.
 */
class VideoService {
	private _baseUrl = '/videos';

	/**
	 * Получает список трендовых видео.
	 */
	getTrendingVideos() {
		return axiosClassic.get<IVideo[]>(`${this._baseUrl}/trending`);
	}

	/**
	 * Получает список видео про игры.
	 */
	getVideoGames() {
		return axiosClassic.get<IVideo[]>(`${this._baseUrl}/games`);
	}

	/**
	 * Получает список видео для раздела "Explore".
	 */
	getExploreVideos(userId?: number) {
		return axiosClassic.get<IVideosPagination>(`${this._baseUrl}/explore`, {
			params: {
				userId
			}
		});
	}

	getAllVideos(searchTerm?: string | null) {
		return axiosClassic.get<IVideosPagination>(
			`${this._baseUrl}`,
			searchTerm
				? {
						params: {
							searchTerm
						}
					}
				: {}
		);
	}

	byPublicId(id?: string | null) {
		return axiosClassic.get<ISingleVideoResponse>(`${this._baseUrl}/by-publicId/${id}`);
	}
}

export const videoService = new VideoService();
