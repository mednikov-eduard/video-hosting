'use client';

import { Video } from 'lucide-react';
import dynamic from 'next/dynamic';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

const DynamicStudioVideoList = dynamic(
	() => import('./StudioVideoList').then(mod => mod.StudioVideoList),
	{
		ssr: false,
		loading: () => (
			<div className='grid-6-cols'>
				<SkeletonLoader
					count={6}
					classNames='h-36 rounded-md'
				/>
			</div>
		)
	}
);

export function StudioVideoListPage() {
	return (
		<section className='pb-5'>
			<SectionTitle
				Icon={Video}
				isPageHeading
			>
				Content
			</SectionTitle>
			<DynamicStudioVideoList />
		</section>
	);
}
