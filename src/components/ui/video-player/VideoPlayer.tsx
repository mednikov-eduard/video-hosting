'use client';

import { Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react';

import { useVideoPlayer } from '@/hooks/use-video-player/useVideoPlayer';

import { getTime } from '@/utils/get-time';

import { PlayerProgressBar } from './player-progress-bar/PlayerProgressBar';
import { SelectQuality } from './select-quality/SelectQuality';
import { VolumeControl } from './volume-control/VolumeControl';
import { EnumVideoPlayerQuality } from '@/types/video-player.types';

export function VideoPlayer({
	fileName,
	isTheaterMode,
	toggleTheaterMode
}: {
	fileName: string;
	isTheaterMode: boolean;
	toggleTheaterMode: () => void;
}) {
	const { fn, playerRef, state } = useVideoPlayer({ fileName });

	return (
		<div className='relative rounded-xl overflow-hidden'>
			<video
				ref={playerRef}
				className=' aspect-video'
				controls={false}
				src={`/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`}
				preload='metadata'
				autoPlay={false}
			/>

			<div className='flex items-center justify-between p-3 absolute bottom-3 left-5 right-5 '>
				<div className='flex items-center gap-4'>
					<button
						onClick={fn.togglePlayPause}
						className='transition-colors hover:text-primary'
					>
						{state.isPlaying ? <Pause /> : <Play />}
					</button>

					<PlayerProgressBar progress={state.progress} />
					<div>
						<span>{getTime(state.currentTime)}</span>
					</div>
				</div>
				<div className='flex items-center gap-5'>
					<VolumeControl
						volume={state.volume}
						isMuted={state.isMuted}
						changeVolume={fn.changeVolume}
						toggleMute={fn.toggleMute}
					/>
					<button className='transition-colors hover:text-primary' onClick={toggleTheaterMode}>
						<RectangleHorizontal />
					</button>
					<SelectQuality
						currentValue={state.quality}
						onChange={fn.changeQuality}
					/>
					<button
						onClick={fn.toggleFullScreen}
						className='transition-colors hover:text-primary'
					>
						<Maximize />
					</button>
				</div>
			</div>
		</div>
	);
}
