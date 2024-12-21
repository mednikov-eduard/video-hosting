import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import { SidebarSubscription } from './menus/subscriptions/SidebarSubscription'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from './sidebar.data'

export function Sidebar() {
	return <aside>
		<SidebarHeader />
		<SidebarMenu menu={SIDEBAR_DATA}/>

		<SidebarSubscription />

		<SidebarMenu menu={MORE_SIDEBAR_DATA} title="More"/>
	</aside>
}
