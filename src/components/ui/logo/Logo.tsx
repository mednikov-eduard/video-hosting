import { SquarePlay } from 'lucide-react'
import Link from 'next/link'

import { COLORS } from '@/constants/colors.constants'

export function Logo() {
	return (
		<Link
			href='/'
			className='inline-flex items-center gap-1.5'
		>
			<SquarePlay
				color={COLORS.primary}
				size={29}
			/>
			<span className='font-semibold text-xl'>Youtube 2.0</span>
		</Link>
	)
}
