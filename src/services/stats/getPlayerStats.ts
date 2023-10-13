import { api } from '../../API'
import type {
	IMatchResponse,
	IPlayerResponse,
	IPreMatchResponse,
} from '../../types/axiosResponse'
import type { IMatch } from '../../types/databaseTypes'
import type { IPeriodStats, IPlayerStats } from '../../types/types'
import { getDateBeforeXDays, getDateRange } from '../../utils/getDates'
import { sortByDate } from '../match/sortByDate'

export const getPlayerStats = async (
	matchData: IMatchResponse | IPreMatchResponse,
	playerData: IPlayerResponse,
): Promise<IPlayerStats> => {
	const allMatches = sortByDate(
		await api.services.getAllPlayerMatches(playerData.api_id),
	) as IMatch[]
	const yearMatches = allMatches.filter(
		(match) => match.est_time >= getDateRange(matchData.est_time, 1, 0).from,
	)
	const tournamentMatches = yearMatches.filter(
		(match) =>
			match.tournament.api_id === matchData.tournament.api_id &&
			match.est_time >= getDateBeforeXDays(match.est_time, 15),
	)

	return {
		tournament: {
			matches: tournamentMatches,
			stats: calculateStatsFromMatchArray(tournamentMatches, playerData),
		},
		year: {
			matches: yearMatches,
			stats: calculateStatsFromMatchArray(yearMatches, playerData),
		},
		all: {
			matches: allMatches,
			stats: calculateStatsFromMatchArray(allMatches, playerData),
		},
		lastMatches: allMatches.splice(-5),
	}
}

const calculateStatsFromMatchArray = (
	matches: IMatch[],
	playerData: IPlayerResponse,
): IPeriodStats['stats'] => {
	const victories = matches.filter(
		(match) => match.match_stats.winner === playerData,
	)

	const acesArray: number[] = []
	const dfArray: number[] = []
	const gamesArray: number[] = []

	matches.forEach((match) => {
		const { aces, df, result } = match.match_stats
		const indexOfPlayer = match.home === playerData ? 0 : 1

		aces ? acesArray.push(aces[indexOfPlayer]) : null
		df ? dfArray.push(df[indexOfPlayer]) : null

		if (typeof result !== 'string') {
			const arrayOfGames = result.map((set) => {
				const setArray = set.split('-')
				return [Number(setArray[0]), Number(setArray[1])]
			})

			const notSuperTieBreaksSets = arrayOfGames.filter(
				(set) => set[0] <= 7 && set[1] <= 7,
			)

			notSuperTieBreaksSets.forEach((set) => gamesArray.push(set[0] + set[1]))
		}
	})

	const acesAvg =
		acesArray.reduce((accumulator, currentValue) => accumulator + currentValue) /
		acesArray.length
	const dfAvg =
		dfArray.reduce((accumulator, currentValue) => accumulator + currentValue) /
		dfArray.length
	const gamesAvg =
		gamesArray.reduce((accumulator, currentValue) => accumulator + currentValue) /
		gamesArray.length

	return {
		victories,
		acesAvg,
		dfAvg,
		gamesAvg,
	}
}

// A redflag is a match where the player was favourite (bellow a defined odd) and lost
// const getRedFlags = (
// 	matches: IMatch[],
// 	playerData: IPlayerResponse,
// ): Omit<IPlayerStats, 'tournament' | 'year' | 'all'> => {
// 	const redFlags: IMatch[] = []
// 	const yellowFlag: IMatch[] = []
// 	const greenFlag: IMatch[] = []
// 	const vs
// }
