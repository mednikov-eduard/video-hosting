'use server';

import { API_URL } from '@/constants/constants';

import type { IAuthResponse } from '@/services/auth.service';

export async function getNewTokensByRefresh(refreshToken: string) {
	const response = await fetch(`${API_URL}$/auth/access-token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `refreshToken=${refreshToken}`
		},
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Field to fetch new tokens');
	}

	const data: IAuthResponse = await response.json();
	return data;
}
