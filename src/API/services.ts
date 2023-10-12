import axios from 'axios'
import { getDateRange, getDayRange } from '../utils/getDates'
import type { IMatch, IPreMatch } from '../types/databaseTypes'

const getDateSchedule = async (
	dayToSearch: number,
): Promise<Array<IPreMatch | IMatch>> => {
	try {
		const dateRange = getDayRange(dayToSearch)

		const response = await axios.get('http://localhost:5000/today-schedule', {
			params: {
				dateRange: {
					from: dateRange.from.toISOString(),
					to: dateRange.to,
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

const getPeriodMatches = async (
	playerApiId: number,
	yearsAgo: number,
	monthsAgo: number,
): Promise<IMatch[]> => {
	try {
		const dateRange = getDateRange(yearsAgo, monthsAgo)

		const response = await axios.get('http://localhost:5000/player-stats', {
			params: {
				dateRange: {
					from: dateRange.from.toISOString(),
					to: dateRange.to,
				},
				playerApiId
			},
		})

		console.log(response)

		const playerEndedMatches: IMatch[] = response.data.endedMatches

		console.log(playerEndedMatches)

		return playerEndedMatches
	} catch (error) {
		console.log(error)
		throw new Error('Error getting a day match schedule')
	}
}
export const API_SERVICES = {
	getDateSchedule,
	getPeriodMatches,
}
