import { axiosClassic, instance } from '@/api/axios';

import type { IPaginationParams } from '@/types/pagination.types';
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
		return axiosClassic.get<IVideosPagination>(`${this._baseUrl}/games`);
	}

	/**
	 * Получает список видео для раздела "Explore".
	 */
	async getExploreVideos(userId?: number, params?: IPaginationParams, excludeIds?: string[]) {
		const excludeIdsString = excludeIds?.join(',') || '';
		const { data } = await axiosClassic.get<IVideosPagination>(`${this._baseUrl}/explore`, {
			params: userId
				? {
						userId,
						...params,
						excludeIds: excludeIdsString
					}
				: params
		});

		return data;
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

	updateViews(publicId: string) {
		return instance.put(`${this._baseUrl}/update-views-count/${publicId}`);
	}
}

export const videoService = new VideoService();
