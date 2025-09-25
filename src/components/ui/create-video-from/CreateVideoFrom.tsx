import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { type UseFormReturn } from 'react-hook-form';

import { STUDIO_PAGE } from '@/config/studio-page.config';

import { Button } from '../button/Button';
import { VideoForm } from '../video-form/VideoForm';

import { studioVideoService } from '@/services/studio/studio-video.service';
import type { IVideoFormData } from '@/types/studio-video.types';

interface Props {
	form: UseFormReturn<IVideoFormData, any, undefined>;
	isReadyToPublish: boolean;
}

export function CreateVideoFrom({ form, isReadyToPublish }: Props) {
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		async onSuccess(){
			const { toast } = await import('react-hot-toast');
			form.reset();
			toast.success('Video successfully created!');
			router.push(STUDIO_PAGE.HOME);
		},
		async onError() {
			const { toast } = await import('react-hot-toast');
			toast.error('Video creating has error!');
		}
	});

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data);
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<VideoForm form={form} />
			<div className='mt-4 text-right'>
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
