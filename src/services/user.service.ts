import { instance } from '@/api/axios';

import type { IFullUser } from '@/types/user.types';

/**
 * Класс, представляющий сервис для работы с видео.
 */
class UserService {
	private _baseUrl = '/users';

	/**
	 * Получает список трендовых видео.
	 */
	getProfile() {
		return instance.get<IFullUser>(`${this._baseUrl}/profile`);
	}
}

export const userService = new UserService();
