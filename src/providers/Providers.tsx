'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LazyMotion, domAnimation } from 'framer-motion';
import { type ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * Компонент-провайдер для предоставления контекста `QueryClient` дочерним компонентам.
 *
 * @param {Object} props - Свойства компонента.
 * @param {ReactNode} props.children - Дочерние компоненты.
 * @returns {JSX.Element} - JSX элемент, представляющий компонент `Providers`.
 */
export function Providers({ children }: { children: ReactNode }) {
	// Создаем контекст `QueryClient` для дочерних компонентов.
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<LazyMotion features={domAnimation}>
				{children}
				<Toaster />
			</LazyMotion>
		</QueryClientProvider>
	);
}
