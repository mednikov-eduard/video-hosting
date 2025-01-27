import { axiosClassic } from '@/api/axios';

import type { IChannel } from '@/types/channel.types';

class ChannelService {
	private _baseUrl = '/channels';

	bySlug(slug?: string | null) {
		return axiosClassic.get<IChannel>(`${this._baseUrl}/by-slug/${slug}`);
	}
}

export const channelService = new ChannelService();
