import { useMutation } from '@tanstack/react-query';
import type { errors } from 'jose';
import type { register } from 'module';
import type { SubmitHandler, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '../button/Button';
import { Field } from '../field/Field';
import { Textarea } from '../field/Textarea';
import { SkeletonLoader } from '../skeleton-loader/SkeletonLoader';

import { playlistService } from '@/services/playlists.service';
import type { IPlaylistData } from '@/types/playlist.types';
import type { IVideoFormData } from '@/types/studio-video.types';

interface Props {
	form: UseFormReturn<IVideoFormData, any, undefined>;
	isReadyToPublish: boolean;
}

export function VideoForm({ form: {
	register,
	handleSubmit,
	formState: {
		errors
	},
	reset,
 
}, isReadyToPublish }: Props) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['upload video'],
		mutationFn: (data: IPlaylistData) => playlistService.createInPlaylist(data),
		onSuccess: () => {
			reset();
			toast.success('Playlist successfully created!');
		},
		onError() {
			toast.error('Playlist has error!');
		}
	});

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		//mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{isPending ? (
				<SkeletonLoader count={2} />
			) : (
				<>
					<Field
						label='Title'
						type='text'
						registration={register('title', { required: 'Title is required!' })}
						error={errors.title?.message}
						placeholder='Enter title:'
					/>
					<Textarea
						label='Description'
						registration={register('description', { required: 'Description is required!' })}
						error={errors.description?.message}
						placeholder='Enter description:'
						rows={12}
					/>

					{/* Upload a thumbnail */}
					{/* Tags */}
				</>
			)}
			<div className='text-center mt-4'>
				<Button
					type='submit'
					disabled={!isReadyToPublish}
				>
					{isReadyToPublish ? 'Publish' : 'Wait processing...'}
				</Button>
			</div>
		</form>
	);
}
