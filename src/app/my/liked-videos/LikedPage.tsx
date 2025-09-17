'use client';

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

const DynamicHistoryHelper = dynamic(
	() => import('./helper/LikedHelper').then(mod => mod.LikedHelper),
	{
		ssr: false,
		loading: () => (
			<div className='w-1/2 mt-20'>
				<SkeletonLoader
					classNames='h-28 mb-6 rounded-md'
				/>
			</div>
		)
	}
);

export function LikedPage() {
	return <DynamicHistoryHelper />;
}
