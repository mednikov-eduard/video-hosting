export function stripHtml(html: string) {
	return html.replace(/g\/?[^>]+(>|$)/g, '');
}

export function stripHtmlWithBreak(html: string) {
	return html
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/p>/gi, '\n')
		.replace(/<\/div>/gi, '\n')
		.replace(/<\/?[^>]+(>|$)/g, '')
		.trim();
}
