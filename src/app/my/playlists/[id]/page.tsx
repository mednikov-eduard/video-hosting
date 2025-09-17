'use client';

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

const DynamicPlaylistsHelper = dynamic(
	() => import('./helper/SinglePlaylist').then(mod => mod.SinglePlaylist),
	{
		ssr: false,
		loading: () => (
			<div className='grid grid-cols-5 gap-6'>
				<SkeletonLoader
					count={3}
					classNames='h-28 mb-6 rounded-md'
				/>
			</div>
		)
	}
);

export default function Page() {
	return <DynamicPlaylistsHelper />;
}
