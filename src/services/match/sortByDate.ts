import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../types/axiosResponse'

export const sortScheduleByDate = (
	matches: Array<IMatchResponse | IPreMatchResponse> | IMatchResponse[],
): Array<IMatchResponse | IPreMatchResponse> | IMatchResponse[] => {
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
