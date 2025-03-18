import { UploadCloud } from 'lucide-react';
import { useId } from 'react';
import type { FieldError } from 'react-hook-form';

import { useUpload } from '@/hooks/useUpload';

import { ImagePreview } from '../image-preview/ImagePreview';

interface Props {
	folder?: string;
	value?: string;
	onChange: (url: string) => void;
	label: string;
	error?: FieldError;
	className?: string;
	isImage?: boolean;
	overlay?: string;
	sizePreview?: [number, number];
}

export function UploadField({
	folder,
	value,
	onChange,
	label,
	error,
	className,
	isImage = true,
	overlay,
	sizePreview = [100, 100]
}: Props) {
	const { isLoading, uploadFile } = useUpload({ onChange, folder });

	const inputId = useId();

	return (
		<div className={className}>
			<label
				htmlFor={inputId}
				className='block text-gray-400 font-semibold mb-2'
			>
				{label}
			</label>
			<label
				htmlFor={inputId}
				className='flex items-center px-4 py-2 bg-transparent rounded-lg shadow-md cursor-pointer hover:bg-primary border border-primary transition-colors w-max'
			>
				<UploadCloud className='mr-2' />
				Upload {label.toLowerCase()}
			</label>

			<input
				id={inputId}
				type='file'
				onChange={uploadFile}
				accept='image/*'
				className='hidden'
			/>
			{error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}

			{isImage && (
				<ImagePreview
					isLoading={isLoading}
					value={value}
					overlay={overlay}
					sizePreview={sizePreview}
				/>
			)}
		</div>
	);
}
