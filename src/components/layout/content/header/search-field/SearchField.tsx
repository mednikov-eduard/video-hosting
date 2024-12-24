/* import { useRouter } from 'next/navigation'
import { type KeyboardEvent, useState } from 'react'

import { PAGE } from '@/config/public-page.config' */
import useSearch from '@/hooks/useSearch'

export function SearchField() {
	/* const [searchTerm, setSearchTerm] = useState('')
	const router = useRouter()

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') {
			return
		}
		e.preventDefault()

		if (searchTerm.trim() !== '') {
			router.push(PAGE.SEARCH(encodeURIComponent(searchTerm)))
		}
	} */

	const { searchTerm, setSearchTerm, handleKeyDown } = useSearch()

	return (
		<div className='w-10/12'>
			<input
				type='search'
				name=''
				id=''
				placeholder='Type to search'
				aria-label='Search'
				className='py-2 px-4 w-1/3 bg-transparent outline-none border-none shadow-none'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	)
}
