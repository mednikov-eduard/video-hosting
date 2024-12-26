import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { SearchHelper } from './helper/SearchHelper';

export const metadata: Metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
};

export default function Page() {
	return <SearchHelper />;
}
