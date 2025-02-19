'use client';

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

const DynamicPlaylistsHelper = dynamic(
	() => import('./helper/PlaylistsHelper').then(mod => mod.PlaylistsHelper),
	{
		ssr: false,
		loading: () => (
			<div className='grid grid-cols-5 gap-6 mt-20'>
				<SkeletonLoader
					count={3}
					classNames='h-44 mb-6 rounded-md'
				/>
			</div>
		)
	}
);

export function PlaylistPage() {
	return <DynamicPlaylistsHelper />;
}
