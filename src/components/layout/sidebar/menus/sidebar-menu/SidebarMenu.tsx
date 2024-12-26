import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import type { ISidebarItem } from '../../sidebar.types';

import { MenuItem } from './menu-item/MenuItem';

interface Props {
	title?: string;
	menu: ISidebarItem[];
}

export function SidebarMenu({ menu, title }: Props) {
	const pathname = usePathname();

	return (
		<nav>
			{title && <div className='opacity-45 uppercase font-medium text-sm mb-3'>{title}</div>}
			<ul>
				{menu.map((menuItem, index) => {
					return (
						<MenuItem
							key={index}
							item={menuItem}
							isActive={!!match(menuItem.link)(pathname)}
						/>
					);
				})}
			</ul>
		</nav>
	);
}
