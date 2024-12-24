import { STUDIO_PAGE } from '@/config/studio-page.config'
import Image from 'next/image'
import Link from 'next/link'

export function HeaderProfile() {
	return <Link href={STUDIO_PAGE.SETTINGS}>
		<Image src="/uploads/avatars/visual.jpg" alt='' width={40} height={40} className='rounded-lg'/>
	</Link>
}
