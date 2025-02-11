import type { Metadata } from 'next';

import { ChannelVideos } from './ChannelVideos';
import { channelService } from '@/services/channel.service';
import type { IChannel } from '@/types/channel.types';
import type { TPageSlugProp } from '@/types/page.types';
import { ChannelPage } from './ChannelPage'


export const revalidate = 100;

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const slug = (await params).slug;

	const data = await channelService.bySlug(slug);
	const channel = data.data;

	return {
		title: channel.user.name,
		description: channel.description,
		openGraph: {
			type: 'profile',
			images: [channel.bannerUrl]
		}
	};
}

export async function generateStaticParams() {
	const { data } = await channelService.getAll();

	return data.map((channel: IChannel) => ({ slug: channel.slug }));
}

export default async function Page({ params }: TPageSlugProp) {
	const slug = (await params).slug;

	const data = await channelService.bySlug(slug);

	const channel = data.data;

	return (
		<section>
			<ChannelPage channel={channel} slug={slug} />
			{!!channel.videos?.length && <ChannelVideos videos={channel.videos} />}
		</section>
	);
}
