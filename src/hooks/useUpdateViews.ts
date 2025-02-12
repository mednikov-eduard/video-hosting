import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { videoService } from '@/services/video.service';
import { watchHistoryService } from '@/services/watch-history.service';
import type { ISingleVideoResponse } from '@/types/video.types';

export function useUpdateViews({ video }: { video: ISingleVideoResponse }) {
	const { mutate: updateViews } = useMutation({
		mutationKey: ['update video views', video.publicId],
		mutationFn: () => videoService.updateViews(video.publicId)
	});

	const { mutate: updateHistory } = useMutation({
		mutationKey: ['update watch history', video.id],
		mutationFn: () => watchHistoryService.updateHistory(video.id)
	});

	useEffect(() => {
		updateViews();
		updateHistory();
	}, [updateViews, updateHistory]);
}
