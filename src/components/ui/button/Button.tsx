import cn from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	children: ReactNode;
	variant?: 'secondary' | 'primary';
}

export function Button({ isLoading, children, variant = 'primary', ...props }: Props) {
	return (
		<button
			className={cn(
				'py-2 px-10 border-2 border-primary  font-semibold rounded  transition-colors disabled:bg-gray-400',
				{
					'bg-primary text-white hover:bg-red-400 hover:border-red-400': variant === 'primary',

					'bg-transparent text-white hover:bg-primary': variant === 'secondary'
				}
			)}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	);
}
