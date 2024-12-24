import { HeaderLinks } from './header-links/HeaderLinks'
import { HeaderProfile } from './header-profile/HeaderProfile'
import { SearchField } from './search-field/SearchField'

export function Header() {
	return (
		<header className='p-layout border-b border-border flex items-center justify-between'>
			<SearchField />
			<div className='flex items-center gap-8'>
				<HeaderLinks />
				<HeaderProfile />
			</div>
		</header>
	)
}
