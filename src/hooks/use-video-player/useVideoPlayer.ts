import { useRef } from 'react';

import { useChangeQuality } from './useChangeQuality';
import { useFullScreen } from './useFullScreen';
import { usePlayPause } from './usePlayPause';
import { useSkipTime } from './useSkipTime';
import { useVideoProgress } from './useVideoProgress';
import { useVideoVolume } from './useVideoVolume';
import type { HTMLCustomVideoElement } from '@/types/video-player.types';

interface Props {
	fileName: string;
}

export function useVideoPlayer({ fileName }: Props) {
	const playerRef = useRef<HTMLCustomVideoElement>({} as HTMLCustomVideoElement);

	const { isPlaying, setIsPlaying, togglePlayPause } = usePlayPause(playerRef);

	const { currentTime, videoTime, progress } = useVideoProgress(playerRef);

	const { quality, changeQuality } = useChangeQuality(
		playerRef,
		fileName,
		currentTime,
		setIsPlaying
	);

	const { toggleFullScreen } = useFullScreen(playerRef);

	const { skipTime } = useSkipTime(playerRef);

	const { volume, isMuted, changeVolume, toggleMute } = useVideoVolume(playerRef);

	return {
		playerRef,
		state: {
			isPlaying,
			quality,
			currentTime,
			videoTime,
			progress,
			volume,
			isMuted
		},
		fn: {
			togglePlayPause,
			skipTime,
			toggleFullScreen,
			changeQuality,
			changeVolume,
			toggleMute
		}
	};
}
