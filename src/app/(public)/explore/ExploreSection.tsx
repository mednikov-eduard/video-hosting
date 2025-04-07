'use client';

import { Compass } from 'lucide-react';
import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { SectionTitle } from '@/ui/section-title/SectionTitle'

const DynamicExplore = dynamic(() => import('./Explore').then(mod => mod.Explore), {
	ssr: false,
	loading: () => (
		<div className='grid-6-cols'>
			<SkeletonLoader
				count={6}
				classNames='h-36 rounded-md'
			/>
		</div>
	)
});

export function ExploreSection() {
	return (
		<section className='pb-5'>
			<SectionTitle Icon={Compass}>Explore</SectionTitle>
			<DynamicExplore />
		</section>
	);
}
