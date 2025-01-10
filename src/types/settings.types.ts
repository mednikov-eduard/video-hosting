import type { IChannel } from './channel.types';
import type { IFullUser } from './user.types';

export interface ISettingsData extends Pick<IFullUser, 'name' | 'email' | 'password'> {
	channel?: Pick<IChannel, 'avatarUrl' | 'bannerUrl' | 'description' | 'slug'>;
}
