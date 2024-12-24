class StudioPageConfig {
	HOME = '/studio'
	SETTINGS = '${this.HOME}/settings'

	UPLOAD_VIDEO = `${this.HOME}/upload`

	/**
	 * путь к странице изменения видео
	 * @param path путь к странице
	 * @returns путь к странице видео
	 */
	EDIT_VIDEO(path: string) {
		return `edit/v/${path}`
	}
}

export const STUDIO_PAGE = new StudioPageConfig()
