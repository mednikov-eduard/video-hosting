import type { HTMLCustomVideoElement } from '@/types/video-player.types'
import { useState, type RefObject } from 'react';



export function usePlayPause( playerRef: RefObject<HTMLCustomVideoElement>) {
	const [isPlaying, setIsPlaying] = useState(true);

	const togglePlayPause = () => {
		if (isPlaying) {
			playerRef.current?.pause();
		} else {
			playerRef.current?.play();
		}
		setIsPlaying(!isPlaying);
	};

	return {
		isPlaying,
		setIsPlaying,
		togglePlayPause
	};
}
