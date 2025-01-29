import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { STUDIO_PAGE } from '@/config/studio-page.config';

import { SidebarHeader } from './header/SidebarHeader';
import { SidebarMenu } from './menus/sidebar-menu/SidebarMenu';
import { SidebarSubscription } from './menus/subscriptions/SidebarSubscription';
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA, STUDIO_SIDEBAR_DATA } from './sidebar.data';

const DynamicLogout = dynamic(() => import('./logout/Logout').then(mod => mod.Logout), {
	ssr: false
});

export function Sidebar({ toggleSidebar }: { toggleSidebar: () => void }) {
	const pathname = usePathname();

	return (
		<aside className=' p-layout border-r border-border bg-bg whitespace-nowrap overflow-hidden z-10'>
			<SidebarHeader toggleSidebar={toggleSidebar} />
			<SidebarMenu menu={SIDEBAR_DATA} />
			<SidebarSubscription />

			{!!pathname.includes(STUDIO_PAGE.HOME) && (
				<>
					<SidebarMenu
						title='studio'
						menu={STUDIO_SIDEBAR_DATA}
					/>
					<span className='h-[1px] bg-border my-5 w-full block'></span>
				</>
			)}

			<SidebarMenu
				menu={MORE_SIDEBAR_DATA}
				title='More for youtube'
			/>
			<DynamicLogout />
		</aside>
	);
}
