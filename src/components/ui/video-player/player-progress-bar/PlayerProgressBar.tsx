'use client';

import { hover } from 'framer-motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import type { ReactElement } from 'react';

import { COLORS } from '@/constants/colors.constants';

import { getTime } from '@/utils/get-time';

interface IHandleProps {
	value: number;
	dragging: boolean;
	index: number;
}

const handleRender = (node: ReactElement, props: IHandleProps) => {
	const { value, dragging, index } = props;

	return (
		<Tooltip
			prefixCls='rc-slider-tooltip'
			overlay={getTime(value)}
			visible={dragging}
			placement='top'
			key={index}
			classNames={{ root: 'tooltip-simple-text' }}
		>
			{node}
		</Tooltip>
	);
};

interface Props {
	currentTime: number;
	duration: number;
	onSeek: (time: number) => void;
}

export function PlayerProgressBar({ currentTime, duration, onSeek }: Props) {
	return (
		<Slider
			min={0}
			max={duration}
			value={currentTime}
			onChange={value => {
				if (typeof value === 'number') {
					onSeek(value);
				}
			}}
			handleRender={handleRender}
			styles={{
				track: { backgroundColor: COLORS.primary, height: 5, transition: 'all .2s ease-in-out' },
				rail: { backgroundColor: 'rgb(196 196 196 / 60%)', height: 5 },
				handle: {
					borderColor: 'transparent',
					width: 16,
					height: 16,
					backgroundColor: 'transparent',
					outline: 'none',
					boxShadow: 'none'
				}
			}}
			className='hover:cursor-pointer'
		/>
	);
}
