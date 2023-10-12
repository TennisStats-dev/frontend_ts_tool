import type { IDateRange } from '../types/types'

// Being 0 = today, 1 = tomorrow, -1 = yesterday
export const getDayRange = (dayToSerch: number): IDateRange => {
	const fromDate = new Date()
	const toDate = new Date()

	const from = fromDate
	from.setDate(fromDate.getDate() + dayToSerch)
	from.setHours(0, 0, 0, 0)

	const to = toDate
	to.setDate(toDate.getDate() + dayToSerch)
	to.setHours(23, 59, 59, 999)

	return {
		from,
		to,
	}
}

export const getDateRange = (yearsAgo: number, monthsAgo: number): IDateRange => {
	const to = new Date()
	const from = new Date()

	if (yearsAgo > 0) {
		const fromYear = to.getFullYear() - yearsAgo
		from.setFullYear(fromYear)
	}

	if (monthsAgo > 0) {
		const fromMonth = to.getMonth() - monthsAgo
		from.setMonth(fromMonth)
	}

	return {
		from,
		to
	}
}
