'use client';

import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import { PAGE } from '@/config/public-page.config';

import type { ISidebarItem } from '../../sidebar.types';

import { MyChannelMenuItem } from './MyChannelMenuItem/MyChannelMenuItem';
import { MenuItem } from './menu-item/MenuItem';
import { useTypedSelector } from '@/store';

interface Props {
	title?: string;
	menu: ISidebarItem[];
}

export function SidebarMenu({ menu, title }: Props) {
	const pathname = usePathname();

	const { isLoggedIn } = useTypedSelector(state => state.auth);

	return (
		<nav>
			{title && <div className='opacity-65 uppercase font-medium text-sm mb-3'>{title}</div>}
			<ul>
				{menu.map((menuItem, index) => {
					const props = {
						item: menuItem,
						isActive: !!match(menuItem.link)(pathname),
						isShowedSidebar: true
					};

					const isMyChannel = menuItem.link === PAGE.MY_CHANNEL;
					const isMyChannelItem = isMyChannel && isLoggedIn;

					return isMyChannelItem ? (
						<MyChannelMenuItem
							key={index}
							{...props}
						/>
					) : isMyChannel ? null : (
						<MenuItem
							key={index}
							{...props}
						/>
					);
				})}
			</ul>
		</nav>
	);
}
