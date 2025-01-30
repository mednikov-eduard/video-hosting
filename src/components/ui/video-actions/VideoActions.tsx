'use client';

import { useMutation } from '@tanstack/react-query';
import { Heart, ListPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { startTransition } from 'react';

import { COLORS } from '@/constants/colors.constants';

import { useProfile } from '@/hooks/useProfile';

import { transformCount } from '@/utils/transform-count';

import { userService } from '@/services/user.service';

interface Props {
	likesCount: number;
	videoId: string;
}

export function VideoActions({ likesCount, videoId }: Props) {
	const { profile, refetch } = useProfile();

	const isLiked = profile?.likes?.some(like => like.videoId === videoId) || false;

	const [isLikedLocal, setIsLikedLocal] = useState<boolean>(isLiked);

	const [optimisticLike, setOptimisticLike] = useState<number>(likesCount);

	useEffect(() => {
		setIsLikedLocal(isLiked);
	}, [isLiked]);

	const { mutate } = useMutation({
		mutationKey: ['like', videoId],
		mutationFn: () => userService.toggleLike(videoId),
		onMutate() {
			startTransition(() => {
				const newIsLiked = !isLikedLocal;
				setIsLikedLocal(newIsLiked);
				setOptimisticLike(prevLikeCount => {
					if (newIsLiked) return prevLikeCount + 1;
					return prevLikeCount - 1;
				});
			});
		},
		onError() {
			startTransition(() => {
				const revertedIsLiked = !isLikedLocal;
				setIsLikedLocal(revertedIsLiked);
				setOptimisticLike(prevLikeCount => {
					if (revertedIsLiked) return prevLikeCount + 1;
					return prevLikeCount - 1;
				});
			});
		},
		onSuccess() {
			refetch();
		}
	});

	return (
		<div className='flex items-center gap-7'>
			<button className='flex items-center gap-1 opacity-80 hover:opacity-100 transition'>
				<ListPlus size={20} />
				Save
			</button>
			<button
				className='flex items-center gap-2 text-primary opacity-80 hover:opacity-100 transition'
				onClick={() => mutate()}
			>
				<Heart
					size={20}
					fill={isLikedLocal ? COLORS.primary : 'transparent'}
				/>
				{transformCount(optimisticLike)}
			</button>
		</div>
	);
}
