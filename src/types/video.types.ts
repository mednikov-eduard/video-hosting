import type { IChannel } from './channel.types';
import type { IComment } from './comment.types'
import type { IPagination } from './pagination.types'
import type { EnumVideoPlayerQuality } from './video-player.types'

/**
 * интерфейс видео
 * @param id - идентификатор видео
 * @param title - заголовок видео
 * @param publicId - идентификатор видео на публичной странице
 * @param description - описание видео
 * @param thumbnailUrl - картинка видео
 * @param videoFileName - имя файла видео
 * @param viewsCount - количество просмотров
 * @param isPublic - публичное видео или нет
 * @param channel - канал
 * @param createdAt - дата создания видео
 */
export interface IVideo {
	id: string;
	title: string;
	publicId: string;
	description: string;
	thumbnailUrl: string;
	videoFileName: string;
	maxResolution: EnumVideoPlayerQuality
	viewsCount: number;
	isPublic: boolean;
	channel: IChannel;
	createdAt: string;
}

export interface IFullVideo extends IVideo {
	likes: [];
	comments: IComment[];
}

export interface ISingleVideoResponse extends IFullVideo {
	similarVideos: IVideo[];
}


export interface IVideosPagination extends IPagination {
	videos: IVideo[];

}