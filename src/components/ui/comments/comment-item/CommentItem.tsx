'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { VerifiedItem } from '@/ui/verified-item/VerifiedItem';

import { PAGE } from '@/config/public-page.config';

import { getInitials } from '@/utils/get-initials';
import { transformDate } from '@/utils/transform-date';

import type { ISingleVideoResponse } from '@/types/video.types';

const DynamicCommentAction = dynamic(
	() => import('@/ui/comment-action/CommentAction').then(mod => mod.CommentAction),
	{ ssr: false }
);

interface Props {
	comment: ISingleVideoResponse['comments'][0];
	refetch: () => void;
}

export function CommentItem({ comment, refetch }: Props) {
	const [text, setText] = useState(comment.text);

	return (
		<div className='flex gap-4 py-5 border-b border-b-border items-start last:border-none'>
			{comment.user.channel ? (
				<Link href={PAGE.CHANNEL(comment.user.channel?.slug || '')}>
					<Image
						alt={comment.user.name || ''}
						src={comment.user.channel?.avatarUrl}
						width={40}
						height={40}
						className='rounded flex-shrink-0 shadow'
						priority
					/>
				</Link>
			) : (
				<div className='w-10 h-10 text-xl font-medium bg-gray-200 text-gray-900 flex items-center justify-center rounded-md flex-shrink-0 shadow'>
					{getInitials(comment.user.name) || 'User'}
				</div>
			)}
			<div>
				<div className='flex items-center gap-3 mb-2'>
					<SectionTitle
						className='mb-0'
						classNameHeading='text-base'
					>
						<span className='flex items-center gap-2'>
							{comment.user.name} {comment.user.channel?.isVerified && <VerifiedItem size={14} />}
						</span>
					</SectionTitle>
					<div className=' text-gray-400 text-xs flex items-center gap-1'>
						{transformDate(comment?.createdAt)}
					</div>
				</div>
				<div>
					<textarea
						className='text-gray-300 text-sm leading-snug bg-transparent resize-none border-transparent focus:border-border  '
						value={text}
						onChange={e => setText(e.target.value)}
					></textarea>
				</div>
				<DynamicCommentAction
					comment={comment}
					refetch={refetch}
					newText={text}
				/>
			</div>
		</div>
	);
}
