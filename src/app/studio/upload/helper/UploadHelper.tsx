'use client';

import * as m from 'framer-motion/m';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CreateVideoFrom } from '@/ui/create-video-from/CreateVideoFrom';
import { DragAndDropVideo } from '@/ui/drag-and-drop/DragAndDropVideo';
import { ProgressVideoProcessing } from '@/ui/progress-video-processing/ProgressVideoProcessing';
import { SectionTitle } from '@/ui/section-title/SectionTitle';

import type { IVideoFormData } from '@/types/studio-video.types';

export function UploadVideoForm() {
	const form = useForm<IVideoFormData>({ mode: 'onChange' });

	const fileName = form.watch('videoFileName');

	const [isReadyToPublish, setIsReadyToPublish] = useState(false);

	return (
		<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				style={{
					position: 'relative',
					maxWidth: '960',
					width: '85%'
				}}
			>
				<div className='bg-bg rounded-lg p-6'>
					<SectionTitle
						classNameHeading='text-xl'
						className=' border-b border-border pb-5'
					>
						Upload a video
					</SectionTitle>

					{!fileName && <DragAndDropVideo reset={form.reset} />}

					<ProgressVideoProcessing
						fileName={fileName}
						isReadyToPublish={isReadyToPublish}
						setIsReadyToPublish={setIsReadyToPublish}
					/>

					{!!fileName && (
						<CreateVideoFrom
							form={form}
							isReadyToPublish={isReadyToPublish}
						/>
					)}
				</div>
			</m.div>
		</div>
	);
}
