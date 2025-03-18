import { SkeletonLoader } from '../skeleton-loader/SkeletonLoader';

export function UploadLoader() {
	return (
		<>
			<div>
				<SkeletonLoader
					count={1}
					classNames='h-[74]'
				/>
				<SkeletonLoader
					count={1}
					classNames='h-[224]'
				/>
				<SkeletonLoader count={1} />
				<SkeletonLoader
					count={1}
					classNames='h-[85]'
				/>
				<SkeletonLoader
					count={1}
					classNames='h-[114]'
				/>
			</div>
			<div>
				<SkeletonLoader
					count={1}
					classNames='w-[423] h-[220]'
				/>
				<SkeletonLoader count={2} />
			</div>
		</>
	);
}
