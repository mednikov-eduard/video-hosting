'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { STUDIO_PAGE } from '@/config/studio-page.config';

import { Button } from '../button/Button';
import { SectionTitle } from '../section-title/SectionTitle';
import { VideoForm } from '../video-form/VideoForm';

import { studioVideoService } from '@/services/studio/studio-video.service';
import type { IVideoFormData } from '@/types/studio-video.types';

export function EditVideoFrom() {
	const { id } = useParams();
	const router = useRouter();

	const queryClient = useQueryClient();

	const form = useForm<IVideoFormData>({ mode: 'onChange' });

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['get studio video', id],
		queryFn: () => studioVideoService.byId(id as string)
	});

	useEffect(() => {
		if (!isSuccess) return;

		const initialVideo = data?.data;

		form.reset({
			description: initialVideo?.description,
			maxResolution: initialVideo?.maxResolution,
			thumbnailUrl: initialVideo?.thumbnailUrl,
			tags: initialVideo?.tags.map(tag => tag.name),
			title: initialVideo?.title,
			videoFileName: initialVideo?.videoFileName
		});
	}, [form, isSuccess, data]);

	const { mutate, isPending } = useMutation({
		mutationKey: ['edit a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.update(id as string, data),
		async onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			});
			form.reset();
			const { toast } = await import('react-hot-toast');
			toast.success('Video successfully updated!');
			router.push(STUDIO_PAGE.HOME);
		},
		async onError() {
			const { toast } = await import('react-hot-toast');
			toast.error('Video updating has error!');
		}
	});

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data);
	};

	return (
		<div className='max-w-7xl mx-auto'>
			<SectionTitle
				Icon={Edit}
				isPageHeading
			>
				Edit Video
			</SectionTitle>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<VideoForm
					form={form}
					isPending={isLoading || isPending}
				/>
				<div className='mt-4 text-right'>
					<Button
						type='submit'
						isLoading={isPending}
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
}
