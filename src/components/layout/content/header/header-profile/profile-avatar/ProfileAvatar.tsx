import Image from 'next/image';
import Link from 'next/link';

import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

import { STUDIO_PAGE } from '@/config/studio-page.config';

import { useProfile } from '@/hooks/useProfile';

export function ProfileAvatar() {
	const { isLoading, profile } = useProfile();
	

	if (isLoading) return <SkeletonLoader classNames='mb-0 w-10 rounded-md' />;

	return (
		<div className='relative'>
			<Link href={STUDIO_PAGE.SETTINGS}>
				<Image
					src={profile?.channel?.avatarUrl || '/avatar.png'}
					alt=''
					width={40}
					height={40}
					className='rounded-lg'
				/>
			</Link>
			{!profile?.verificationToken && (
				<div className='absolute -left-4 -bottom-3.5 bg-primary p-0.5 rounded text-xs w-max'>
					Not verified
				</div>
			)}
		</div>
	);
}
