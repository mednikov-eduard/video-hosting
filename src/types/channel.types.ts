import type { IUser } from './user.types'
import type { IVideo } from './video.types'

/**
 * интерфейс канала
 * @param id - идентификатор канала
 * @param slug - слаг канала
 * @param description - описание канала
 * @param isVerified - подтвержден ли канал
 * @param avatarUrl - ссылка на аватар канала
 * @param bannerUrl - ссылка на баннер канала
 * @param user - пользователь
 * @param videos - видео
 * @param subscribers - подписчики
 * @param createdAt - дата создания
 */
export interface IChannel {
	id: string
	slug: string
	description: string
	isVerified: boolean
	avatarUrl: string
	bannerUrl: string
	user: IUser
	videos: IVideo[]
	subscribers: []
	createdAt: string
}
