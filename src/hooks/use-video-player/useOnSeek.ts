import type { Dispatch, RefObject, SetStateAction } from 'react';

import type { HTMLCustomVideoElement } from '@/types/video-player.types';

export type TSkipTime = 'forward' | 'backward';

export function useOnSeek(
	playerRef: RefObject<HTMLCustomVideoElement>,
	bgRef: RefObject<HTMLCustomVideoElement>,
	setCurrentTime: Dispatch<SetStateAction<number>>
) {
	const onSeek = (time: number) => {
		if (!playerRef.current?.currentTime) return;

		playerRef.current.currentTime = time;

		if (bgRef?.current) {
			bgRef.current.currentTime = time;
		}

		setCurrentTime(time);
	};

	return {
		onSeek
	};
}
