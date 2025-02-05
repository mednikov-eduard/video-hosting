'use client'

import parse from 'html-react-parser';
import { useState } from 'react';

import styles from './VideoDescription.module.scss'

import { processHtmlContent } from '@/utils/process-html-content';

interface Props {
	description: string;
}

export function VideoDescription({ description }: Props) {
	const [isExpanded, setIsExpanded] = useState(false);

	const { initialContent, isShouldShowToggle } = processHtmlContent(description, 3);

	return (
		<div className='mb-4 bg-bdLight px-3 py-1 rounded-md'>
				<article
					className={styles.article}
				>
					{parse(isExpanded ? description : initialContent)}
				</article>
			{isShouldShowToggle && (
				<button
					onClick={() => setIsExpanded(prev => !prev)}
					className='text-gray-400 text-sm transition-colors hover:text-gray-200'
				>
					{isExpanded ? 'Hide' : 'Show more'}
				</button>
			)}
		</div>
	);
}
