import { type RefObject, useEffect, useState } from 'react';

import type { HTMLCustomVideoElement } from '@/types/video-player.types';

export function useVideoProgress(
	playerRef: RefObject<HTMLCustomVideoElement>,
	bgRef: RefObject<HTMLCustomVideoElement>
) {
	const [currentTime, setCurrentTime] = useState(0);
	const [videoTime, setVideoTime] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const originalTime = playerRef.current?.duration;

		if (originalTime && playerRef.current) {
			
			const currentTime = playerRef.current.currentTime;
			
			setVideoTime(originalTime);
			setCurrentTime(currentTime);
			setProgress((currentTime / originalTime) * 100);
		}
	}, [playerRef, playerRef.current?.duration]);

	useEffect(() => {
		const player = playerRef.current;
		const updateProgress = () => {
			if (!player) return;

			const currentTime = player.currentTime;
			const originalTime = player.duration;

			setCurrentTime(currentTime);
			setProgress((currentTime / originalTime) * 100);
		};

		player?.addEventListener('timeupdate', updateProgress);

		return () => {
			player?.removeEventListener('timeupdate', updateProgress);
		};
	}, [playerRef]);

	return {
		currentTime,
		videoTime,
		progress,
		setCurrentTime
	};
}
