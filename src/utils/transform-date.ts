import dayjs from 'dayjs'
import relativeDate from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeDate)

/**
* Преобразует дату в формат "относительное время".
*
* @param {string} createdAt - Дата в формате строки.
* @returns {string} - Относительное время в формате строки.
*/
export function transformDate(createdAt: string): string {
	// Возвращает относительное время в формате строки.
	return dayjs(createdAt).fromNow()
}
