import type { ISidebarItem } from '../../sidebar.types'

import { MenuItem } from './menuItem/MenuItem'

interface Props {
	title?: string
	menu: ISidebarItem[]
}

export function SidebarMenu({ menu, title }: Props) {
	return (
		<nav>
			{title && <div className='opacity-45 uppercase font-medium text-sm mb-3'>{title}</div>}
			<ul>
				{menu.map((menuItem, index) => {
					return (
						<MenuItem
							key={index}
							item={menuItem}
						/>
					)
				})}
			</ul>
		</nav>
	)
}
