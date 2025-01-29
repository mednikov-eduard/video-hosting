import type { IChannel } from './channel.types';
import type { IWatchHistory } from './history.types';
import type { IVideo } from './video.types'

/**
 * интерфейс пользователя
 * @param id - идентификатор пользователя
 * @param name - имя пользователя
 * @param email - почта пользователя
 * @param password - пароль пользователя
 */
export interface IUser {
	id: number;
	name: string;
	email?: string;
	password?: string;
}

export interface IFullUser extends IUser {
	channel: IChannel;
	subscriptions: IChannel[];
	watchHistory: IWatchHistory[];
	verificationToken?: string | null;
}

export interface IProfileResponse extends IFullUser {
	subscribedVideos?: IVideo[]
}