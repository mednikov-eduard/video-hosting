import type { LucideIcon } from 'lucide-react'

interface Props {
	children: React.ReactNode
	Icon?: LucideIcon
}

export function SectionTitle({ children, Icon }: Props) {
	return (
		<div className='flex items-center gap-1  opacity-90 mb-4'>
			{Icon && <Icon className='text-primary' />}
			<h2 className='font-semibold text-lg'>{children}</h2>
		</div>
	)
}
