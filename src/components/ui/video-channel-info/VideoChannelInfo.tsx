import dynamicNext from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VerifiedItem } from '@/ui/verified-item/VerifiedItem';

import { PAGE } from '@/config/public-page.config';

import { transformCount } from '@/utils/transform-count';

import { SectionTitle } from '../section-title/SectionTitle';

const DynamicSubscribeButton = dynamicNext(
	() => import('@/ui/subscribe-button/SubscribeButton').then(mod => mod.SubscribeButton),
	{ ssr: true, loading: () => <SkeletonLoader classNames='w-36 h-10 rounded-md' /> }
);

interface Props {
	slug: string;
	userName: string;
	avatarUrl: string;
	isVerified: boolean;
	subscribers: number;
}

export function VideoChannelInfo({ slug, userName, avatarUrl, isVerified, subscribers }: Props) {
	return (
		<div className='flex items-center justify-between mb-6'>
			<div className='flex gap-4 items-center'>
				<Link href={PAGE.CHANNEL(slug)}>
					<Image
						alt={userName || ''}
						src={avatarUrl}
						width={55}
						height={55}
						className='rounded-md flex-shrink-0 shadow'
						priority
					/>
				</Link>
				<div>
					<Link href={PAGE.CHANNEL(slug)}>
						<SectionTitle
							className='mb-0'
							classNameHeading='text-lg'
						>
							<span className='flex items-center gap-2'>
								{userName} {isVerified && <VerifiedItem size={14} />}
							</span>
						</SectionTitle>
					</Link>
					<div className=' text-gray-400 text-sm flex items-center gap-1'>
						{transformCount(subscribers)} subscribers
					</div>
				</div>
			</div>
			<DynamicSubscribeButton slug={slug} />
		</div>
	);
}
