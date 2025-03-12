import toast from 'react-hot-toast';

export const validateFileSize = (file: File, maxSize: number = 2 * 1024 * 1024) => {
	let maxSizeFormatted: string
	if (maxSize >= 1024 * 1024 * 1024) {
		maxSizeFormatted = (maxSize / (1024 * 1024 * 1024)).toFixed(0) + 'GB';
	} else {
		maxSizeFormatted = (maxSize / (1024 * 1024)).toFixed(1) + 'MB';
	}

	if (file.size > maxSize) {
		toast.error(`File size is too big! (max ${maxSizeFormatted})`);
		return false;
	}
	return true;
};
