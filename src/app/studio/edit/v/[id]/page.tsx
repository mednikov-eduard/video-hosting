import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { EditVideoFrom } from '@/ui/edit-video-form/EditVideoFrom'

export const metadata: Metadata = {
	title: 'Edit video',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <EditVideoFrom />
}
