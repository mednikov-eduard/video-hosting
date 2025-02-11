import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true, // Строгий режим React

	poweredByHeader: false, // Нельзя посмотреть на чем написан сайт

	// Подмена ссылки на сервер
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL}/uploads/:path*`
			}
		];
	},
};

export default nextConfig;
