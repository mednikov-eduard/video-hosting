import { SquarePlay } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { COLORS } from '@/constants/colors.constants';
import { SITE_NAME } from '@/constants/constants';

import { STUDIO_PAGE } from '@/config/studio-page.config';

export function Logo() {
	const pathname = usePathname();

	return (
		<Link
			href={!!pathname.includes(STUDIO_PAGE.HOME) ? '/studio' : '/'}
			className='inline-flex items-center gap-1.5'
		>
			<SquarePlay
				color={COLORS.primary}
				size={29}
			/>
			<span className='font-semibold text-xl'>
				{!!pathname.includes(STUDIO_PAGE.HOME) ? 'STUDIO' : `${SITE_NAME.toUpperCase()}`}
			</span>
		</Link>
	);
}
