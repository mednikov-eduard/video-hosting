import { axiosClassic, instance } from '@/api/axios';

import type { IChannel } from '@/types/channel.types';

class ChannelService {
	private _baseUrl = '/channels';

	getAll() {
		return axiosClassic.get<IChannel[]>(this._baseUrl);
	}

	bySlug(slug?: string | null) {
		return axiosClassic.get<IChannel>(`${this._baseUrl}/by-slug/${slug}`);
	}

	toggleSubscribe(channelSlug: string) {
		return instance.patch(`${this._baseUrl}/toggle-subscribe/${channelSlug}`);
	}
}

export const channelService = new ChannelService();
