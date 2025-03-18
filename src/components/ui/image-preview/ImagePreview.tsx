import Image from 'next/image';

import { SkeletonLoader } from '../skeleton-loader/SkeletonLoader';

interface Props {
	isLoading: boolean;
	value?: string;
	overlay?: string;
	sizePreview: [number, number];
}

export function ImagePreview({
	isLoading,
	value,
	overlay,
	sizePreview = [100, 100]
}: Props) {
	const [width, height] = sizePreview;

	return (
		<div className='mt-3'>
			{isLoading ? (
				<SkeletonLoader style={{ width: width, height: height }} />
			) : (
				!!value && (
					<div className='relative'>
						{!!overlay && (
							<Image
								alt='Overlay'
								src={overlay}
								className='rounded-md absolute top-0 left-0'
								width={width}
								height={height}
								priority
							/>
						)}
						<Image
							alt='Upload file'
							src={value}
							className='rounded-md'
							width={width}
							height={height}
							priority
						/>
					</div>
				)
			)}
		</div>
	);
}
