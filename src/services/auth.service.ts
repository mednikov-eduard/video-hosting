import Cookies from 'js-cookie';

import { axiosClassic } from '@/api/axios';

import type { IAuthData } from '@/app/auth/auth-form.types';
import type { IUser } from '@/types/user.types';

export enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export interface IAuthResponse {
	user: IUser;
	accessToken: string;
}

class AuthService {
	private _auth = '/auth';

	async main(type: 'login' | 'register', data: IAuthData, recaptchaToken?: string | null) {
		const response = await axiosClassic.post<IAuthResponse>(`${this._auth}/${type}`, data, {
			headers: {
				recaptcha: recaptchaToken
			}
		});

		if (response.data.accessToken) {
			this._saveTokenStorage(response.data.accessToken);
		}
		return response;
	}

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(`${this._auth}/access-token`);

		if (response.data.accessToken) {
			this._saveTokenStorage(response.data.accessToken);
		}

		return response;
	}

	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this._auth}/access-token`,
			{},
			{
				headers: {
					Cookies: `refreshToken=${refreshToken}`
				}
			}
		);

		if (response.data.accessToken) {
			this._saveTokenStorage(response.data.accessToken);
		}

		return response;
	}

	async logout() {
		const response = await axiosClassic.post<boolean>(`${this._auth}/logout`);

		if (response.data) {
			this._removeTokenStorage();
		}

		return response;
	}

	private _saveTokenStorage(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 1
		});
	}

	private _removeTokenStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN);
	}
}

export const authService = new AuthService();
