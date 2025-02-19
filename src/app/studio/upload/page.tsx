import type { Metadata } from 'next';

/* import { UploadForm } from '@/ui/upload-form/UploadForm'; */

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { UploadVideoForm } from './helper/UploadHelper';

export const metadata: Metadata = {
	title: 'Upload',
	...NO_INDEX_PAGE
};

export default function Page() {
	return <UploadVideoForm />;
}
