import { useHotkeys } from 'react-hotkeys-hook';

import type { TSkipTime } from './useSkipTime';
import type { EnumVideoPlayerQuality, HTMLCustomVideoElement } from '@/types/video-player.types';

interface Props {
	togglePlayPause: () => void;
	skipTime: (type?: TSkipTime) => void;
	toggleFullScreen: () => void;
	changeQuality: (quality: EnumVideoPlayerQuality) => void;
	changeVolume: (volume: number) => void;
	toggleMute: () => void;
	toggleTheaterMode: () => void;
	volume: number;
}

export function useVideoHotkeys({ volume, ...fn }: Props) {
	useHotkeys('space', e => {
		e.preventDefault();
		fn.togglePlayPause();
	});

	useHotkeys('left', e => {
		e.preventDefault();
		fn.skipTime('backward');
	});

	useHotkeys('right', e => {
		e.preventDefault();
		fn.skipTime('forward');
	}); 

	useHotkeys('up', e => {
		e.preventDefault();
		fn.changeVolume(Math.min(volume + 0.1, 1));
	});

	useHotkeys('down', e => {
		e.preventDefault();
		fn.changeVolume(Math.max(volume - 0.1, 0));
	});

	useHotkeys('f', e => {
		e.preventDefault();
		fn.toggleFullScreen();
	});

	useHotkeys('m', e => {
		e.preventDefault();
		fn.toggleMute();
	});

	useHotkeys('t', e => {
		e.preventDefault();
		fn.toggleTheaterMode();
	});
}
