import dynamic from 'next/dynamic';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

import { HeaderLinks } from './header-links/HeaderLinks';
import { SearchField } from './search-field/SearchField';

const DynamicHeaderProfile = dynamic(
	() => import('./header-profile/HeaderProfile').then(mod => mod.HeaderProfile),
	{ ssr: false, loading: () => <SkeletonLoader classNames='mb-0 w-10 rounded-md' /> }
);

export function Header() {
	return (
		<header className='p-layout border-b border-border flex items-center justify-between'>
			<SearchField />
			<div className='flex items-center gap-8'>
				<HeaderLinks />
				<DynamicHeaderProfile />
			</div>
		</header>
	);
}
