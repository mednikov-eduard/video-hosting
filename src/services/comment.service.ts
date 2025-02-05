import { axiosClassic, instance } from '@/api/axios';

import type { IComment, ICommentData } from '@/types/comment.types';

class CommentService {
	private _baseUrl = '/comment';

	async byVideoPublicId(publicId?: string | null) {
		const { data } = await axiosClassic.get<IComment[]>(`${this._baseUrl}/by-video/${publicId}`);
		return data;
	}

	create(data: ICommentData) {
		return instance.post<IComment>(this._baseUrl, data);
	}

	update(id: string, data: ICommentData) {
		return instance.put<IComment>(`${this._baseUrl}/${id}`, data);
	}

	delete(id: string) {
		return instance.put<IComment>(`${this._baseUrl}/${id}`);
	}
}

export const commentService = new CommentService();
