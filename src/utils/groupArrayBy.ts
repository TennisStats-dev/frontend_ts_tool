import type { IMatch, IPreMatch } from '../types/databaseTypes'
import type { IMatchesGroupedByTournament } from '../types/types'

export const groupArrayBy = (
	arrayInput: Array<IPreMatch | IMatch>,
): IMatchesGroupedByTournament[] => {
	const groupedSchedule = new Map<number, Array<IPreMatch | IMatch>>()

	for (const match of arrayInput) {
		if (!groupedSchedule.has(match.tournament.api_id)) {
			groupedSchedule.set(match.tournament.api_id, [])
		}

		const tournament = groupedSchedule.get(match.tournament.api_id)

		if (tournament !== undefined) {
			tournament.push(match)
		}
	}

	const groupedScheduleArray = Array.from(groupedSchedule, ([key, value]) => ({
		tournamentId: key,
		matches: value,
	}))

	return groupedScheduleArray
}
