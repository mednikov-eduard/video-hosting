import { useRef, useState } from 'react';

import { useChangeQuality } from './useChangeQuality';
import { useFullScreen } from './useFullScreen';
import { useOnSeek } from './useOnSeek';
import { usePlayPause } from './usePlayPause';
import { useSkipTime } from './useSkipTime';
import { useVideoHotkeys } from './useVideoHotkeys';
import { useVideoProgress } from './useVideoProgress';
import { useVideoVolume } from './useVideoVolume';
import type { HTMLCustomVideoElement } from '@/types/video-player.types';

interface Props {
	fileName: string;
	toggleTheaterMode: () => void;
}

export function useVideoPlayer({ fileName, toggleTheaterMode }: Props) {
	const playerRef = useRef<HTMLCustomVideoElement>({} as HTMLCustomVideoElement);
	const bgRef = useRef<HTMLCustomVideoElement>({} as HTMLCustomVideoElement);

	const [isLightingMode, setIsLightingMode] = useState(true);

	const { isPlaying, setIsPlaying, togglePlayPause } = usePlayPause(playerRef, bgRef);
	const { currentTime, videoTime, progress, setCurrentTime } = useVideoProgress(playerRef, bgRef);
	const { quality, changeQuality } = useChangeQuality(
		playerRef,
		fileName,
		currentTime,
		setIsPlaying
	);

	const { toggleFullScreen } = useFullScreen(playerRef);
	const { skipTime } = useSkipTime(playerRef, bgRef);

	const { volume, isMuted, changeVolume, toggleMute } = useVideoVolume(playerRef);
	const { onSeek } = useOnSeek(bgRef, playerRef, setCurrentTime);

	const fn = {
		togglePlayPause,
		skipTime,
		toggleFullScreen,
		changeQuality,
		changeVolume,
		toggleMute,
		onSeek,
		toggleLightingMode: () => setIsLightingMode(!isLightingMode)
	};

	useVideoHotkeys({
		volume,
		toggleTheaterMode,
		...fn
	});

	return {
		playerRef,
		bgRef,
		state: {
			isPlaying,
			quality,
			currentTime,
			videoTime,
			progress,
			volume,
			isMuted,
			isLightingMode
		},
		fn
	};
}
