'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

/**
 * Компонент-провайдер для предоставления контекста `QueryClient` дочерним компонентам.
 *
 * @param {Object} props - Свойства компонента.
 * @param {ReactNode} props.children - Дочерние компоненты.
 * @returns {JSX.Element} - JSX элемент, представляющий компонент `Providers`.
 */
export function Providers({ children }: { children: ReactNode }) {
	// Создаем контекст `QueryClient` для дочерних компонентов.
	const [queryClient] = useState(() => new QueryClient())

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
