import type { IChannel } from './channel.types';

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
	viewsCount: number;
	isPublic: boolean;
	channel: IChannel;
	createdAt: string;
}
