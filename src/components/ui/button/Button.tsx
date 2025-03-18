'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	children: ReactNode;
	variant?: 'secondary' | 'primary';
}

export function Button({ isLoading, children, variant = 'primary', ...props }: Props) {
	return (
		<button
			className={twMerge(
				'py-2 px-10 border-2 border-primary  font-semibold rounded  transition-colors disabled:bg-transparent',
				variant === 'primary' && 'bg-primary text-white hover:bg-red-400 hover:border-red-400',
				variant === 'secondary' && 'bg-transparent text-white hover:bg-primary'
			)}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	);
}
