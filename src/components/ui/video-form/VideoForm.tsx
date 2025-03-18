import { useMutation } from '@tanstack/react-query';
import type { errors } from 'jose';
import type { register } from 'module';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
	Controller,
	type SubmitHandler,
	type UseFormHandleSubmit,
	type UseFormReturn
} from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '../button/Button';
import { Field } from '../field/Field';
import { Textarea } from '../field/Textarea';
import { SkeletonLoader } from '../skeleton-loader/SkeletonLoader';
import { TagsField } from '../tags-field/TagsField';
import { UploadField } from '../upload-field/UploadField';
import { UploadLoader } from '../upload-loader/UploadLoader';

import { studioVideoService } from '@/services/studio/studio-video.service';
import type { IVideoFormData } from '@/types/studio-video.types';
import { STUDIO_PAGE } from '@/config/studio-page.config'

interface Props {
	form: UseFormReturn<IVideoFormData, any, undefined>;
	isReadyToPublish: boolean;
}

export function VideoForm({
	form: {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
		watch
	},
	isReadyToPublish
}: Props) {

	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess: () => {
			reset();
			toast.success('Video successfully created!');
			router.push(STUDIO_PAGE.HOME);
		},
		onError() {
			toast.error('Video creating has error!');
		}
	});

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='grid-cols-[2.5fr_1fr] grid gap-6'>
				{isPending ? (
					<UploadLoader />
				) : (
					<>
						<div>
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
								rows={7}
							/>

							<Controller
								control={control}
								name='thumbnailUrl'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<UploadField
										label='Thumbnail:'
										onChange={onChange}
										value={value}
										error={error}
										folder='thumbnails'
										className='mb-4'
										sizePreview={[151, 82]}
									/>
								)}
							/>

							<Controller
								control={control}
								name='tags'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TagsField
										label='Tags:'
										onTagsChange={onChange}
										tags={value}
										error={error?.message}
									/>
								)}
							/>
						</div>

						<div>
							<div className='bg-bdLight p-2 rounded-md'>
								{watch('thumbnailUrl') ? (
									<Image
										alt='Uploaded thumbnail'
										src={watch('thumbnailUrl')}
										className='rounded-md'
										width={423}
										height={220}
									/>
								) : (
									<div className='max-w-[423] h-[220] screen bg-gray-900 rounded-md flex items-center justify-center'>
										Wait thumbnail...
									</div>
								)}
								<div className='text-sm pt-2'>
									<span className='text-gray-400 text-[0.9rem] block mb-0.5'>File name: </span>
									<span>{watch('videoFileName')}</span>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			<div className='text-center mt-4 text-right'>
				<Button
					type='submit'
					disabled={!isReadyToPublish}
					isLoading={isPending}
				>
					{isReadyToPublish ? 'Publish' : 'Wait processing...'}
				</Button>
			</div>
		</form>
	);
}
