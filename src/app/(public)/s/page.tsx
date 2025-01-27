'use client'

/* import type { Metadata } from 'next'; */
import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

/* import { NO_INDEX_PAGE } from '@/constants/seo.constants'; */

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
/* 
export const metadata: Metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
}; */

export default function Page() {
	return <DynamicSearchPage />;
}
