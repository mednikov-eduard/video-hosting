import type { IUser } from './user.type'
import type { IVideo } from './video.type'

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
