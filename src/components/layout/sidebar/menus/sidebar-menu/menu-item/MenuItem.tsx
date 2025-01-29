import cn from 'clsx';
import Link from 'next/link';

import type { IMenuItemProps } from '../MyChannelMenuItem/menu.types';

export function MenuItem({ item, isActive }: IMenuItemProps) {
	return (
		<li>
			<Link
				href={item.link}
				className={'group py-3 flex items-center gap-5 '}
				title={item.label}
			>
				<item.icon
					className={cn('group-hover:text-primary transition group-hover:rotate-6 min-w-6', {
						'text-primary': isActive,
						'text-white': !isActive
					})}
				/>
				<span
					className={cn('border-b', {
						' border-white': isActive,
						'border-transparent': !isActive
					})}
				>
					{item.label}
				</span>
			</Link>
			{item.isBottomBorder && <span className='h-[1px] bg-border my-5 w-full block'></span>}
		</li>
	);
}
