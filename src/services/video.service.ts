import axios from 'axios'

import type { IVideo } from '@/types/video.types'

/**
 * Класс, представляющий сервис для работы с видео.
 */
class VideoService {
	/**
	 * Получает список трендовых видео.
	 */
	getTrendingVideos() {
		return axios.get<IVideo[]>('http://localhost:4200/api/videos/trending')
	}

	/**
	 * Получает список видео для раздела "Explore".
	 */
	getExploreVideos() {
		return axios.get('http://localhost:4200/api/videos/explore')
	}

	getAllVideos(searchTerm?: string | null) {
		return axios.get(
			'http://localhost:4200/api/videos',
			searchTerm
				? {
						params: {
							searchTerm
						}
					}
				: {}
		)
	}
}

export const videoService = new VideoService()
