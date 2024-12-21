import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/sidebarMenu/SidebarMenu'
import { SidebarSubscription } from './menus/subscriptions/SidebarSubscription'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from './sidebar.data'

export function Sidebar({toggleSidebar}: { toggleSidebar: () => void }) {
	return (
		<aside className=' p-layout border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar}/>
			<SidebarMenu menu={SIDEBAR_DATA} />
			<SidebarSubscription />
			<SidebarMenu
				menu={MORE_SIDEBAR_DATA}
				title='More for youtube'
			/>
		</aside>
	)
}
