import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../types/axiosResponse'
import type {
	IMatchesGroupedByTournament,
	IMatchesGroupedByTournamentAndDay,
} from '../../types/types'
import { formatDay } from '../../utils/formatDate'

export const groupTournamentMatchesByDay = (
	arrayInput: IMatchesGroupedByTournament[],
): IMatchesGroupedByTournamentAndDay[] => {
	const tournamentsGroupedByDay: IMatchesGroupedByTournamentAndDay[] = []

	arrayInput.forEach((tournament) => {
		const groupedMatchesByDay = new Map<
			string,
			Array<IPreMatchResponse | IMatchResponse>
		>()

		for (const match of tournament.matches) {
			const day = formatDay(new Date(match.est_time))

			if (!groupedMatchesByDay.has(day)) {
				groupedMatchesByDay.set(day, [])
			}

			const groupedMatches = groupedMatchesByDay.get(day)

			if (groupedMatches !== undefined) {
				groupedMatches.push(match)
			}
		}

		const groupedMatchesByDayArray = Array.from(
			groupedMatchesByDay,
			([key, value]) => ({
				day: key,
				matches: value,
			}),
		)

		const groupedtournamentByDay = {
			id: tournament.id,
			name: tournament.name,
			groupedMatches: groupedMatchesByDayArray,
		}

		tournamentsGroupedByDay.push(groupedtournamentByDay)
	})

	return tournamentsGroupedByDay
}
