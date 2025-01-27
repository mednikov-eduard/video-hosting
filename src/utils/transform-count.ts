/**
 * Преобразует количество просмотров в форматированную строку.
 *
 * @param {number} count - Количество просмотров.
 * @returns {string} - Форматированная строка с количеством просмотров.
 */
export function transformCount(count: number): string {
	let formattedCount: string

	if (count >= 1_000_000_000) {
		// округляем до одного знака после запятой (~1.0)
		formattedCount = (count / 1_000_000_000).toFixed(1)
		// если число оканчивается на .0, убираем его (~1.0 -> 1)
		formattedCount = formattedCount.endsWith('.0') ? formattedCount.slice(0, -2) : formattedCount
		// добавляем 'B count' (~1B count)
		return `${formattedCount}B`
	} else if (count >= 1_000_000) {
		// Аналогично для миллионов (~1.0)
		formattedCount = (count / 1_000_000).toFixed(1)
		// Аналогично для миллионов (1.0 -> 1)
		formattedCount = formattedCount.endsWith('.0') ? formattedCount.slice(0, -2) : formattedCount
		// Аналогично для миллионов (1M count)
		return `${formattedCount}M`
	} else if (count >= 1_000) {
		// Аналогично для тысяч (~1.0)
		formattedCount = (count / 1_000).toFixed(1)
		// Аналогично для тысяч (1.0 -> 1)
		formattedCount = formattedCount.endsWith('.0') ? formattedCount.slice(0, -2) : formattedCount
		// Аналогично для тысяч (1K count)
		return `${formattedCount}K`
	} else {
		// Возвращаем просто количество просмотров (1 count), если оно меньше 1_000
		return `${count}`
	}
}
