import type { NextRequest } from 'next/server';

import { PAGE } from './config/public-page.config';
import { STUDIO_PAGE } from './config/studio-page.config';
import { protectLoginPages } from './server-action/middlewares/protect-login.middleware';
import { protectStudio } from './server-action/middlewares/protect-studio.middleware';

export async function middleware(request: NextRequest) {
	const url = new URL(request.url);

	const pathName = url.pathname;

	if (pathName.includes(STUDIO_PAGE.HOME) || pathName.includes('/my')) {
		return protectStudio(request);
	}

	if (pathName.includes(PAGE.AUTH)) {
		return protectLoginPages(request);
	}
}

export const config = {
	matcher: ['/studio/:path*', '/auth/:path*', '/my/:path*']
};
