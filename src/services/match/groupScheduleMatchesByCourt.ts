import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../types/axiosResponse'
import type { IMatchesGroupedByCourt } from '../../types/types'

export const groupScheduleMatchesByCourt = (
	matchesArray: Array<IMatchResponse | IPreMatchResponse>,
): IMatchesGroupedByCourt[] => {
	const groupedByCourt = new Map<
		number,
		{
			courtName: string
			groupedMatches: Array<IMatchResponse | IPreMatchResponse>
		}
	>()

	for (const match of matchesArray) {
		if (match.court !== undefined) {
			const { api_id: courtApiId, name: courtName } = match.court
			if (!groupedByCourt.has(courtApiId)) {
				groupedByCourt.set(courtApiId, {
					courtName,
					groupedMatches: [],
				})
			}

			const court = groupedByCourt.get(courtApiId)

			if (court !== undefined) {
				court.groupedMatches.push(match)
			}
		}
	}

	const scheduledMatchesGroupedByCourt = Array.from(
		groupedByCourt,
		([key, value]) => {
			return {
				courtId: key,
				courtName: value.courtName,
				groupedMatches: value.groupedMatches,
			}
		},
	)

	return scheduledMatchesGroupedByCourt
}
