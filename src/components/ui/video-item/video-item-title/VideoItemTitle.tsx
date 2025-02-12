import Link from 'next/link';

import { PAGE } from '@/config/public-page.config';

interface Props {
	publicId: string;
	title: string;
}

export function VideoItemTitle({ publicId, title }: Props) {
	return (
		<Link
			href={PAGE.VIDEO(publicId)}
			className='line-clamp-2 leading-[1.3]'
		>
			{title}
		</Link>
	);
}
