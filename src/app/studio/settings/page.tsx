import { Settings } from 'lucide-react';
import type { Metadata } from 'next';

import { SectionTitle } from '@/ui/section-title/SectionTitle';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { SettingsForm } from '@/ui/settings-form/SettingsForm'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
};

export default function Page() {
	return (
		<div>
			<SectionTitle
				Icon={Settings}
				isPageHeading
			>
				Settings
			</SectionTitle>

			<SettingsForm />
		</div>
	);
}
