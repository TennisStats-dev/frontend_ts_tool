import axios from 'axios'
import { getDateRange } from '../utils/getDateRange'
import type { IMatch, IPreMatch } from '../types/databaseTypes'

const getDateSchedule = async (
	dayToSearch: number,
): Promise<Array<IPreMatch | IMatch>> => {
	try {
		const dateRange = getDateRange(dayToSearch)

		console.log(dateRange.from.toISOString())

		console.log(dateRange)

		const response = await axios.get('http://localhost:5000/todaySchedule', {
			params: {
				dateRange: {
                    from: dateRange.from.toISOString(),
                    to: dateRange.to
                },
			},
		})

		const schedule: Array<IPreMatch | IMatch> = response.data.result

		return schedule
	} catch (error) {
		console.log(error)
		throw new Error('Error getting a day match schedule')
	}
}

export const API_SERVICES = {
	getDateSchedule,
}
