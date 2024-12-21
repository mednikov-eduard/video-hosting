import type { PropsWithChildren } from 'react'
import { Sidebar } from './sidebar/Sidebar'
import { Content } from './content/Content'

export function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<main>
			<Sidebar />
			<Content>{children}</Content>
		</main>
	)
}
