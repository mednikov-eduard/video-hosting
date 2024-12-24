/**
 * Преобразует количество просмотров в форматированную строку.
 *
 * @param {number} views - Количество просмотров.
 * @returns {string} - Форматированная строка с количеством просмотров.
 */
export function transformViews(views: number): string {
	let formattedViews: string

	if (views >= 1_000_000_000) {
		// округляем до одного знака после запятой (~1.0)
		formattedViews = (views / 1_000_000_000).toFixed(1)
		// если число оканчивается на .0, убираем его (~1.0 -> 1)
		formattedViews = formattedViews.endsWith('.0') ? formattedViews.slice(0, -2) : formattedViews
		// добавляем 'B views' (~1B views)
		return `${formattedViews}B views`
	} else if (views >= 1_000_000) {
		// Аналогично для миллионов (~1.0)
		formattedViews = (views / 1_000_000).toFixed(1)
		// Аналогично для миллионов (1.0 -> 1)
		formattedViews = formattedViews.endsWith('.0') ? formattedViews.slice(0, -2) : formattedViews
		// Аналогично для миллионов (1M views)
		return `${formattedViews}M views`
	} else if (views >= 1_000) {
		// Аналогично для тысяч (~1.0)
		formattedViews = (views / 1_000).toFixed(1)
		// Аналогично для тысяч (1.0 -> 1)
		formattedViews = formattedViews.endsWith('.0') ? formattedViews.slice(0, -2) : formattedViews
		// Аналогично для тысяч (1K views)
		return `${formattedViews}K views`
	} else {
		// Возвращаем просто количество просмотров (1 views), если оно меньше 1_000
		return `${views} views`
	}
}
