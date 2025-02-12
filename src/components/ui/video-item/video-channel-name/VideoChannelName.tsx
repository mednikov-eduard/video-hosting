import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { VerifiedItem } from '@/ui/verified-item/VerifiedItem';

import { PAGE } from '@/config/public-page.config';

import type { IChannel } from '@/types/channel.types';

interface Props {
	channel: IChannel;
	spanClassName?: string;
}

export function VideoChannelName({ channel, spanClassName }: Props) {
	return (
		<Link
			href={PAGE.CHANNEL(channel.slug)}
			className='flex items-center gap-1'
		>
			<span
				className={twMerge(
					'text-gray-400 text-sm hover:text-gray-100 transition-all',
					spanClassName
				)}
			>
				{channel.user.name}
			</span>
			{channel.isVerified && <VerifiedItem />}
		</Link>
	);
}
