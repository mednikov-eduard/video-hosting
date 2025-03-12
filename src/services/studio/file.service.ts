import { instance } from '@/api/axios';
import type { IFileResponse, IProgressProcessingResponse } from '@/types/file.types'

class FileService {
	private _baseUrl = '/upload-file';

	uploadFile(file: FormData, folder?: string) {
		return instance.post<IFileResponse[]>(
			`${this._baseUrl}`,
			file,
			{
				params: {
					folder
				},
				headers: { 'Content-Type': 'multipart/form-data' }
			}
		);
	}

	getProcessingStatus(fileName: string) {
		return instance.get<IProgressProcessingResponse>(`${this._baseUrl}/status/${fileName}`);
	}
}

export const fileService = new FileService();
