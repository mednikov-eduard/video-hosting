import { Menu, SquarePlay } from 'lucide-react'
import Link from 'next/link'

import { COLORS } from '@/constants/colors.constants'

export function SidebarHeader({toggleSidebar}: { toggleSidebar: () => void }) {
	return (
		<div className='flex items-center gap-6 mb-12'>
			<button className='opacity-85 hover:opacity-100 transition-opacity' onClick={toggleSidebar}>
				<Menu />
			</button>
			<Link
				href='/'
				className='flex items-center gap-1.5'
			>
				<SquarePlay
					color={COLORS.primary}
					size={29}
				/>
				<span className='font-semibold text-xl'>Youtube 2.0</span>
			</Link>
		</div>
	)
}
