import type { IDateRange } from '../types/types'

// Being 0 = today, 1 = tomorrow, -1 = yesterday
export const getDateRange = (dayToSerch: number): IDateRange => {
	const dateFrom = new Date()
	const dateTo = new Date()

	const from = dateFrom
	from.setDate(dateFrom.getDate() + dayToSerch)
	from.setHours(0, 0, 0, 0)

	const to = dateTo
	to.setDate(dateTo.getDate() + dayToSerch)
	to.setHours(23, 59, 59, 999)

	return {
		from,
		to
	}
}
