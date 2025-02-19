import type { IVideo } from './video.types';

export interface IVideoFormData
	extends Omit<IVideo, 'channel' | 'viewsCount' | 'publicId' | 'createdAt' | 'isPublic'> {
	tags: string[];
}
