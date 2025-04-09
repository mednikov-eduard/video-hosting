import Image from 'next/image';
import { Controller, type UseFormReturn } from 'react-hook-form';

import { stripHtmlWithBreak } from '@/utils/strip-html';

import { Field } from '../field/Field';
import { Textarea } from '../field/Textarea';
import { TagsField } from '../tags-field/TagsField';
import { UploadField } from '../upload-field/UploadField';
import { UploadLoader } from '../upload-loader/UploadLoader';

import type { IVideoFormData } from '@/types/studio-video.types';

interface Props {
	isPending?: boolean;
	form: UseFormReturn<IVideoFormData, any, undefined>;
}

export function VideoForm({
	form: {
		formState: { errors },
		control,
		register,
		watch,
		handleSubmit
	},
	isPending
}: Props) {
	return (
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

						<Controller
							control={control}
							name='description'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<Textarea
									label='Description'
									value={stripHtmlWithBreak(value || '')}
									onChange={e => onChange(e.target.value)}
									error={error?.message}
									placeholder='Enter description:'
									rows={7}
								/>
							)}
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
	);
}
