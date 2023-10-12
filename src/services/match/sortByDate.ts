import type { IMatch, IPreMatch } from '../../types/databaseTypes'

export const sortByDate = (
	matches: Array<IMatch | IPreMatch> | IMatch[],
): Array<IMatch | IPreMatch> | IMatch[] => {
	const sortedMatches = matches.sort((a, b) => {
		if (a.est_time < b.est_time) {
			return -1
		}
		if (a.est_time > b.est_time) {
			return 1
		}
		return 0
	})

	return sortedMatches
}
