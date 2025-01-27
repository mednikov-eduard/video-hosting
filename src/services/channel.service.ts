import { axiosClassic } from '@/api/axios';

import type { IChannel } from '@/types/channel.types';

class ChannelService {
	private _baseUrl = '/channels';

	getAll() {
		return axiosClassic.get<IChannel[]>(this._baseUrl);
	}

	bySlug(slug?: string | null) {
		return axiosClassic.get<IChannel>(`${this._baseUrl}/by-slug/${slug}`);
	}
}

export const channelService = new ChannelService();
