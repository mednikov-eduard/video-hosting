import cn from 'clsx';
import type { LucideIcon } from 'lucide-react';

interface Props {
	children: React.ReactNode;
	Icon?: LucideIcon;
	isH1?: boolean;
	isPageHeading?: boolean;
}

export function SectionTitle({ children, Icon, isH1 = false, isPageHeading = false }: Props) {
	return (
		<div
			className={cn(
				'flex items-center gap-1  opacity-90 ',
				isPageHeading ? 'gap-2.5 mb-6' : 'gap-1.5 mb-4'
			)}
		>
			{Icon && <Icon className='text-primary' />}
			{isH1 || isPageHeading ? (
				<h1 className={cn('font-semibold', isPageHeading ? 'text-3xl' : 'text-lg')}>
					{children}
				</h1>
			) : (
				<h2 className='font-semibold text-lg'>{children}</h2>
			)}
		</div>
	);
}
