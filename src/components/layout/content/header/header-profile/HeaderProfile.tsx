import Image from 'next/image';
import Link from 'next/link';

import { LinkButton } from '@/ui/button/LinkButton';

import { PAGE } from '@/config/public-page.config';
import { STUDIO_PAGE } from '@/config/studio-page.config';

import { useTypedSelector } from '@/store';
import { LogIn } from 'lucide-react'

export function HeaderProfile() {
	const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn);

	return isLoggedIn ? (
		<Link href={STUDIO_PAGE.SETTINGS}>
			<Image
				src='/uploads/avatars/visual.jpg'
				alt=''
				width={40}
				height={40}
				className='rounded-lg'
			/>
		</Link>
	) : (
		<LinkButton href={PAGE.AUTH}> <LogIn size={20}/> Login</LinkButton>
	);
}
