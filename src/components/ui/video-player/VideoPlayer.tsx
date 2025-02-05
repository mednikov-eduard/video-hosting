'use client';

import { Lightbulb, LightbulbOff, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react';

import { useVideoPlayer } from '@/hooks/use-video-player/useVideoPlayer';

import { getTime } from '@/utils/get-time';

import { PlayerProgressBar } from './player-progress-bar/PlayerProgressBar';
import { SelectQuality } from './select-quality/SelectQuality';
import { VolumeControl } from './volume-control/VolumeControl';
import { EnumVideoPlayerQuality } from '@/types/video-player.types';

interface Props {
	fileName: string;
	toggleTheaterMode: () => void;
	maxResolution: EnumVideoPlayerQuality;
}

export function VideoPlayer({ fileName, toggleTheaterMode, maxResolution }: Props) {
	const { fn, playerRef, bgRef, state } = useVideoPlayer({ fileName, toggleTheaterMode });

	return (
		<div className='relative rounded-2xl mb-5'>
			{state.isLightingMode && (
				<video
					ref={bgRef}
					className='absolute top-0 left-0 w-full h-full object-cover filter blur-3xl brightness-90 contrast-125 saturate-150 mix-blend-lighten'
					controls={false}
					src={`/uploads/videos/${EnumVideoPlayerQuality['720p']}/${fileName}`}
					muted
				/>
			)}

			<video
				ref={playerRef}
				className='aspect-video w-full relative z-[1] rounded-xl'
				controls={false}
				src={`/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`}
				preload='metadata'
				onDoubleClick={fn.toggleFullScreen}
				onClick={fn.togglePlayPause}
			/>

			<div className='grid grid-cols-[7fr_1fr] gap-7 absolute bottom-5 left-5 right-5 z-[1]'>
				<div className='flex items-center gap-6'>
					<button
						onClick={fn.togglePlayPause}
						className='transition-colors hover:text-primary'
					>
						{state.isPlaying ? <Pause /> : <Play />}
					</button>
					<PlayerProgressBar
						currentTime={state.currentTime}
						duration={state.videoTime}
						onSeek={fn.onSeek}
					/>

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
					<button
						className='transition-colors hover:text-primary'
						onClick={toggleTheaterMode}
					>
						<RectangleHorizontal />
					</button>
					<SelectQuality
						currentValue={state.quality}
						onChange={fn.changeQuality}
						maxResolution={maxResolution}
					/>
					<button
						onClick={fn.toggleLightingMode}
						className='transition-colors hover:text-primary'
					>
						{state.isLightingMode ? <Lightbulb /> : <LightbulbOff />}
					</button>
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
