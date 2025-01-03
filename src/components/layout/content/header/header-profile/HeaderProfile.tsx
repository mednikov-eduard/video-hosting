import { LinkButton } from '@/ui/button/LinkButton';

import { PAGE } from '@/config/public-page.config';

import { useTypedSelector } from '@/store';
import { LogIn } from 'lucide-react'
import { ProfileAvatar } from './profile-avatar/ProfileAvatar'

export function HeaderProfile() {
	const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn);

	return isLoggedIn ? (
		<ProfileAvatar />
	) : (
		<LinkButton href={PAGE.AUTH}> <LogIn size={20}/> Login</LinkButton>
	);
}
