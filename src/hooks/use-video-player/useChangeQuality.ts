import { type RefObject, useState } from 'react';

import { EnumVideoPlayerQuality, type HTMLCustomVideoElement } from '@/types/video-player.types';

export function useChangeQuality(
	playerRef: RefObject<HTMLCustomVideoElement>,
	fileName: string,
	currentTime: number,
	setIsPlaying: Function,
) {
	const [quality, setQuality] = useState(EnumVideoPlayerQuality['1080p']);

	const changeQuality = (quality: EnumVideoPlayerQuality) => {
		if (!playerRef.current) return;

		setQuality(quality);

		playerRef.current.src = `/uploads/videos/${quality}/${fileName}`;

		playerRef.current.currentTime = currentTime + 0.3;

		playerRef.current.play();

		setIsPlaying(true);
	};

	return {
		quality,
		changeQuality
	};
}
