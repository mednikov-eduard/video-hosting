import { useRouter } from 'next/navigation'
import { type KeyboardEvent, useState } from 'react'

import { PAGE } from '@/config/public-page.config'

function useSearch(): {
	searchTerm: string
	setSearchTerm: (searchTerm: string) => void
	handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
} {
	const [searchTerm, setSearchTerm] = useState('')
	const router = useRouter()

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') {
			return
		}
		e.preventDefault()

		if (searchTerm.trim() !== '') {
			router.push(PAGE.SEARCH(encodeURIComponent(searchTerm)))
		}
	}

	return { searchTerm, setSearchTerm, handleKeyDown }
}

export default useSearch
