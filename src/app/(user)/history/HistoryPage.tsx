'use client';

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

const DynamicHistoryHelper = dynamic(
	() => import('./helper/HistoryHelper').then(mod => mod.HistoryHelper),
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

export function HistoryPage() {
	return <DynamicHistoryHelper />;
}
