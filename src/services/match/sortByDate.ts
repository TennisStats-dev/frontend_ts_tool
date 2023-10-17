import type { IMatchResponse, IPreMatchResponse } from '../../types/axiosResponse'
import type { IPreMatch } from '../../types/databaseTypes'

export const sortScheduleByDate = (
	matches: Array<IMatchResponse | IPreMatchResponse> | IMatchResponse[],
): Array<IMatchResponse | IPreMatch> | IMatchResponse[] => {
	const sortedMatches = matches.sort((a, b) => {
		if (a.est_time > b.est_time) {
			return 1
		}
		if (a.est_time < b.est_time) {
			return -1
		}
		return 0
	})

	return sortedMatches
}

export const sortEndedMatchesByDate = (
	matches: IMatchResponse[],
): IMatchResponse[] => {
	const sortedMatches = matches.sort((a, b) => {
		if (a.est_time < b.est_time) {
			return 1
		}
		if (a.est_time > b.est_time) {
			return -1
		}
		return 0
	})

	return sortedMatches
}
