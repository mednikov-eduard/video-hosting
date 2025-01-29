import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader'

const DynamicSubHelper = dynamic(() => import('./helper/SubHelper').then(mod => mod.SubHelper), {
	ssr: true,
	loading: () => (
		<div className='grid grid-cols-6 gap-6'>
			<SkeletonLoader
				count={3}
				classNames='h-36 rounded-md'
			/>
		</div>
	)
});

export const metadata: Metadata = {
	title: 'Subscriptions',
	...NO_INDEX_PAGE
};

export default function Page() {
	return <DynamicSubHelper />;
}
