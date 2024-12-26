import type { IChannel } from './channel.types';
import type { IWatchHistory } from './history.types';

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
	channel?: IChannel;
}

export interface IFullUser extends IUser {
	channel: IChannel;
	subscription: IChannel[];
	watchHistory: IWatchHistory[];
}
