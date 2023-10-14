import axios from 'axios'
import { getDateRange, getDayRange } from '../utils/getDates'
import type {
	IAxiosResponse,
	IMatchResponse,
	IPreMatchResponse,
} from '../types/axiosResponse'

const getDateSchedule = async (
	dayToSearch: number,
): Promise<Array<IPreMatchResponse | IMatchResponse>> => {
	try {
		const dateRange = getDayRange(dayToSearch)

		const response = await axios.get<
			IAxiosResponse<Array<IPreMatchResponse | IMatchResponse>>
		>('http://localhost:5000/today-schedule', {
			params: {
				dateRange: {
					from: dateRange.from.toISOString(),
					to: dateRange.to,
				},
			},
		})

		const schedule = response.data.result

		return schedule
	} catch (error) {
		console.log(error)
		throw new Error('Error getting a day match schedule')
	}
}

const getPeriodPlayerMatches = async (
	playerApiId: number,
	yearsAgo: number,
	monthsAgo: number,
): Promise<IMatchResponse[]> => {
	try {
		const date = new Date()
		const dateRange = getDateRange(date, yearsAgo, monthsAgo)

		const response = await axios.get<IAxiosResponse<IMatchResponse[]>>(
			'http://localhost:5000/player-stats-range',
			{
				params: {
					dateRange: {
						from: dateRange.from.toISOString(),
						to: dateRange.to,
					},
					playerApiId,
				},
			},
		)

		const playerEndedMatches = response.data.result

		return playerEndedMatches
	} catch (error) {
		console.log(error)
		throw new Error('Error getting a day match schedule')
	}
}

const getAllPlayerMatches = async (
	playerApiId: number,
): Promise<IMatchResponse[]> => {
	try {
		const response = await axios.get<IAxiosResponse<IMatchResponse[]>>(
			'http://localhost:5000/player-stats',
			{
				params: {
					playerApiId,
				},
			},
		)

		const playerEndedMatches = response.data.result

		return playerEndedMatches
	} catch (error) {
		console.log(error)
		throw new Error('Error getting a day match schedule')
	}
}
export const API_SERVICES = {
	getDateSchedule,
	getPeriodPlayerMatches,
	getAllPlayerMatches,
}
