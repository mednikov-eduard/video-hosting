/**
 * пути для публичных страниц
 */
class PublicPage {
	AUTH = '/auth'
	HOME = '/'
	TRENDING = '/trending'
	VIDEO_GAMES = '/video-games'

	MY_CHANNEL = '/my-channel'
	SUBSCRIPTIONS = '/subscriptions'
	HISTORY = '/history'
	LIKED_VIDEOS = '/liked-videos'

	FEEDBACK = '/feedback'

	/**
	 * путь к странице видео
	 * @param path путь к странице
	 * @returns путь к странице видео
	 */
	VIDEO(path: string) {
		return `/v/${path}`
	}

	/**
	 * путь к странице канала
	 * @param path путь к странице
	 * @returns путь к странице канала
	 */
	CHANNEL(path: string) {
		return `/c/${path}`
	}

	SEARCH(searchTerm: string) {
		return `/s?term=${searchTerm}`
	}
}

// экспорт экземпляра класса
export const PAGE = new PublicPage()
