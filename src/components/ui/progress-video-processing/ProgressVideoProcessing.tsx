import { useQuery } from '@tanstack/react-query';
import * as m from 'framer-motion/m';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { COLORS } from '@/constants/colors.constants';

import { fileService } from '@/services/studio/file.service';

interface Props {
	fileName: string;
	setIsReadyToPublish: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProgressVideoProcessing({ fileName, setIsReadyToPublish }: Props) {
	const [progress, setProgress] = useState(0);

	const { data: processingData, isSuccess } = useQuery({
		queryKey: ['progressing video', fileName],
		queryFn: () => fileService.getProcessingStatus(fileName),
		select: data => data.data.status,
		refetchInterval: query => {
			const queryProgress = query.state.data?.data;
			return queryProgress !== undefined && queryProgress.status < 100 ? 10000 : false;
		},
		enabled: !!fileName
	});

	useEffect(() => {
		if (!processingData) return;
		setProgress(processingData);

		if (processingData === 100) {
			setIsReadyToPublish(true);
			toast.success('Video processed successfully!');
		}
	}, [isSuccess, processingData, setIsReadyToPublish]);

	return (
		progress > 0 && (
			<m.div
				initial={{ width: 0 }}
				animate={{ width: `${progress}%` }}
				style={{
					height: '0.5rem',
					backgroundColor: COLORS.primary,
					borderRadius: 10,
					transition: 'all .4s ease'
				}}
			/>
		)
	);
}
