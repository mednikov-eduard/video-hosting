import type { LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface Props {
	children: React.ReactNode;
	Icon?: LucideIcon;
	isH1?: boolean;
	isPageHeading?: boolean;
	className?: string;
	classNameHeading?: string;
}

export function SectionTitle({
	children,
	Icon,
	isH1 = false,
	isPageHeading = false,
	className,
	classNameHeading
}: Props) {
	return (
		<div
			className={twMerge(
				'flex items-center gap-1  opacity-90 ',
				isPageHeading ? 'gap-2.5 mb-6' : 'gap-1.5 mb-4',
				className
			)}
		>
			{Icon && <Icon className='text-primary' size={isPageHeading ? 30 : 24} />}
			{isH1 || isPageHeading ? (
				<h1
					className={twMerge(
						'font-semibold',
						isPageHeading ? 'text-3xl' : 'text-lg',
						classNameHeading
					)}
				>
					{children}
				</h1>
			) : (
				<h2 className={twMerge('font-semibold text-lg', classNameHeading)}>{children}</h2>
			)}
		</div>
	);
}
