'use client'

import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

const DynamicSearchPage = dynamic(
	() => import('./helper/SearchHelper').then(mod => mod.SearchHelper),
	{
		ssr: false,
		loading: () => (
			<div className='grid grid-cols-6 gap-6'>
				<SkeletonLoader
					count={3}
					classNames='h-36 rounded-md'
				/>
			</div>
		)
	}
);
export function SPage() {
	return <DynamicSearchPage />;
}
