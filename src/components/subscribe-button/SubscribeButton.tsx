'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button/Button';

import { PAGE } from '@/config/public-page.config';

import { useProfile } from '@/hooks/useProfile';

import { channelService } from '@/services/channel.service';

export function SubscribeButton({ slug }: { slug: string }) {
	const { profile, refetch } = useProfile();
	const router = useRouter();

	const { mutate } = useMutation({
		mutationKey: ['subscribe'],
		mutationFn: () => channelService.toggleSubscribe(slug),
		onSuccess: () => {
			refetch();
		}
	});

	const handleClick = () => {
		if (profile) {
			mutate();
		} else {
			router.push(PAGE.AUTH);
		}
	};
	const isSub = profile?.subscriptions?.some(sub => sub.slug === slug);

	return (
		<Button
			onClick={handleClick}
			variant={isSub ? 'secondary' : 'primary'}
		>
			{isSub ? 'Subscribed' : 'Subscribe'}
		</Button>
	);
}
