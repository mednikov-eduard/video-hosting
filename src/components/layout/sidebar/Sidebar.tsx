import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/sidebar-menu/SidebarMenu'
import { SidebarSubscription } from './menus/subscriptions/SidebarSubscription'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from './sidebar.data'

export function Sidebar({toggleSidebar}: { toggleSidebar: () => void }) {
	return (
		<aside className=' p-layout border-r border-border bg-bg whitespace-nowrap overflow-hidden z-10'>
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
