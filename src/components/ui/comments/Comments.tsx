'use client';

import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import { SectionTitle } from '../section-title/SectionTitle';

import { CommentItem } from './comment-item/CommentItem';
import { commentService } from '@/services/comment.service';
import type { ISingleVideoResponse } from '@/types/video.types';

const DynamicAddCommentForm = dynamic(
	() => import('./add-comment-form/AddCommentForm').then(mod => mod.AddCommentForm),
	{ ssr: false }
);

interface Props {
	video: ISingleVideoResponse;
}

export function Comments({ video }: Props) {
	const { data, refetch } = useQuery({
		queryKey: ['comments', video.id],
		queryFn: () => commentService.byVideoPublicId(video.publicId),
		initialData: video.comments
	});

	return (
		<div className='border-t border-t-border pt-5 mt-7'>
			<SectionTitle
				className='mb-0'
				classNameHeading='text-2xl'
			>
				{data.length} Comments
			</SectionTitle>
			<DynamicAddCommentForm
				videoId={video.id}
				refetch={refetch}
			/>
			<div>
				{!!data ? (
					data?.map(comment => (
						<CommentItem
							key={comment.id}
							comment={comment}
							refetch={refetch}
						/>
					))
				) : (
					<p>No comments</p>
				)}
			</div>
		</div>
	);
}
