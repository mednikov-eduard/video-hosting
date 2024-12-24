import type { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	count?: number
	style?: CSSProperties
	classNames?: string
}

export function SkeletonLoader({ count = 1, style, classNames = '' }: Props) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => {
				return (
					<div
						key={index}
						className={twMerge('bg-slate-800 rounded-sm h-10 mb-2.5 animate-pulse', classNames)}
						style={style}
					></div>
				)
			})}
		</>
	)
}
