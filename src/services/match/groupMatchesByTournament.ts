import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../types/axiosResponse'
import type { IMatchesGroupedByTournament } from '../../types/types'

export const groupMatchesByTournament = (
	arrayInput: Array<IPreMatchResponse | IMatchResponse>,
): IMatchesGroupedByTournament[] => {
	const groupedSchedule = new Map<
		number,
		Array<IPreMatchResponse | IMatchResponse>
	>()

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
		id: key,
		name: value[0].tournament.name,
		matches: value,
	}))

	const sortedArray = groupedScheduleArray.sort((a, b) => {
		if (a.name < b.name) {
			return -1
		}
		if (a.name > b.name) {
			return 1
		}
		return 0
	})

	return sortedArray
}
