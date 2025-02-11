export interface IPageProp<T> {
	params: Promise<T>;
}

export type TPageSlugProp = IPageProp<{ slug: string }>;
export type TPagePublicIdProp = IPageProp<{ publicId: string }>;
