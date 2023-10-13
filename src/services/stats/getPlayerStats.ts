import { api } from '../../API'
import type {
	IDoublesPlayerResponse,
	IMatchResponse,
	IPlayerResponse,
	IPreMatchResponse,
} from '../../types/axiosResponse'
import type { Surface } from '../../types/databaseTypes'
import type { IPlayerStats, IStats } from '../../types/types'
import { getDateBeforeXDays, getDateRange } from '../../utils/getDates'
import { sortEndedMatchesByDate } from '../match/sortByDate'

export const getPlayerStats = async (
	matchData: IMatchResponse | IPreMatchResponse,
	playerData: IPlayerResponse,
): Promise<IPlayerStats> => {
	const allMatches = await api.services.getAllPlayerMatches(playerData.api_id)

	console.log(allMatches[0].tournament)

	const allMatchesSortedByDate = sortEndedMatchesByDate(allMatches)

	const nonRetiredAllMatches = allMatchesSortedByDate.filter(
		(match) =>
			match.match_stats.winner !== undefined &&
			typeof match.match_stats.result !== 'string',
	)

	const yearMatches = nonRetiredAllMatches.filter((match) => {
		const startingPeriod = getDateRange(new Date(matchData.est_time), 1, 0).from
		return new Date(match.est_time) >= startingPeriod
	})

	console.log(yearMatches)

	const tournamentMatches = yearMatches.filter((match) => {
		const startingPeriod = getDateBeforeXDays(new Date(matchData.est_time), 15)

		return (
			match.tournament.api_id === matchData.tournament.api_id &&
			new Date(match.est_time) >= startingPeriod
		)
	})

	console.log(tournamentMatches)

	const greenFlag = calculateTournamentAdditionalStats(
		tournamentMatches,
		playerData,
	)

	let yearStats:
		| Pick<IPlayerStats, 'redFlag' | 'yellowFlag' | 'vsSimilarRivals'>
		| undefined

	if (matchData.pre_odds?.first.win !== undefined) {
		const winnerOdds = matchData.pre_odds?.first.win
		const favouriteMatchOdd = Math.min(...winnerOdds.map((odd) => Number(odd)))

		yearStats = calculateYearAdditionalStats(
			yearMatches,
			playerData,
			favouriteMatchOdd,
		)
	}

	return {
		tournament: {
			matches: tournamentMatches,
			stats: {
				all: calculateStatsFromMatchArray(tournamentMatches, playerData),
				onSurface: calculateStatsFromMatchArray(
					tournamentMatches,
					playerData,
					matchData.tournament.ground?.surface,
				),
			},
		},
		year: {
			matches: yearMatches,
			stats: {
				all: calculateStatsFromMatchArray(yearMatches, playerData),
				onSurface: calculateStatsFromMatchArray(
					yearMatches,
					playerData,
					matchData.tournament.ground?.surface,
				),
			},
		},
		all: {
			matches: nonRetiredAllMatches,
			stats: {
				all: calculateStatsFromMatchArray(nonRetiredAllMatches, playerData),
				onSurface: calculateStatsFromMatchArray(
					nonRetiredAllMatches,
					playerData,
					matchData.tournament.ground?.surface,
				),
			},
		},
		lastMatches: allMatches.splice(-5),
		...yearStats,
		greenFlag,
	}
}

const calculateStatsFromMatchArray = (
	matchesInput: IMatchResponse[],
	playerData: IPlayerResponse,
	surface?: Surface,
): IStats => {
	let matches = matchesInput

	if (surface !== undefined) {
		matches = matches.filter(
			(match) => match.tournament.ground?.surface === surface,
		)
	}

	const victories = matches.filter(
		(match) => match.match_stats.winner === playerData,
	)

	const acesArray: number[] = []
	const dfArray: number[] = []
	const gamesArray: number[] = []

	matches.forEach((match) => {
		const { aces, df, result } = match.match_stats
		const indexOfPlayer = match.home === playerData ? 0 : 1

		if (aces !== undefined) {
			acesArray.push(aces[indexOfPlayer])
		}

		if (df !== undefined) {
			dfArray.push(df[indexOfPlayer])
		}

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

const calculateYearAdditionalStats = (
	matches: IMatchResponse[],
	playerData: IPlayerResponse | IDoublesPlayerResponse,
	favouriteOdd: number,
): Pick<IPlayerStats, 'redFlag' | 'yellowFlag' | 'vsSimilarRivals'> => {
	const redFlag: IMatchResponse[] = []
	const yellowFlag: IMatchResponse[] = []
	const vsSimilarRivalSample: IMatchResponse[] = []

	const oddsDataAvailableMatches = matches.filter(
		(match) => match.pre_odds?.first.win !== undefined,
	)

	oddsDataAvailableMatches.forEach((match) => {
		const winnerOdds = match.pre_odds?.first.win as [string, string]
		const favouriteMatchOdd = Math.min(...winnerOdds.map((odd) => Number(odd)))
		const playerOdd = Number(winnerOdds[match.home === playerData ? 0 : 1])
		const winner = match.match_stats.winner

		if (
			favouriteOdd >= favouriteMatchOdd - 0.1 &&
			favouriteOdd <= favouriteMatchOdd + 0.1
		) {
			vsSimilarRivalSample.push(match)
		}

		if (playerOdd <= 1.05 && winner !== playerData) {
			redFlag.push(match)
		}

		if (playerOdd <= 1.2 && winner !== playerData) {
			yellowFlag.push(match)
		}
	})

	const vsSimilarRivalsVictories = vsSimilarRivalSample.filter((match) => {
		return match.match_stats.winner === playerData
	})

	return {
		redFlag,
		yellowFlag,
		vsSimilarRivals: {
			won: vsSimilarRivalsVictories,
			sample: vsSimilarRivalSample,
		},
	}
}

const calculateTournamentAdditionalStats = (
	tournamentMatches: IMatchResponse[],
	playerData: IPlayerResponse | IDoublesPlayerResponse,
): IMatchResponse[] => {
	const greenFlag: IMatchResponse[] = []

	tournamentMatches.forEach((match) => {
		const winnerOdds = match.pre_odds?.first.win
		if (winnerOdds !== undefined) {
			const playerOdd = Number(winnerOdds[match.home === playerData ? 0 : 1])

			if (playerOdd >= 3) {
				greenFlag.push(match)
			}
		}
	})

	return greenFlag
}

export const getH2H = (
	playerMatches: IMatchResponse[],
	rivalPlayer: IPlayerResponse,
): IMatchResponse[] => {
	return playerMatches.filter(
		(match) => match.home === rivalPlayer || match.away === rivalPlayer,
	)
}

export const getIsFixed = (
	match: IPreMatchResponse | IMatchResponse,
): boolean | undefined => {
	if (
		match.pre_odds?.first.win !== undefined &&
		match.pre_odds.last.win !== undefined
	) {
		const firstWinnerOdds = match.pre_odds?.first.win.map((odd) => Number(odd))
		const lastWinnerOdds = match.pre_odds?.last.win.map((odd) => Number(odd))

		const indexOfFavourite = firstWinnerOdds.reduce(
			(maxIndex, currentValue, currentIndex, array) =>
				currentValue < array[maxIndex] ? currentIndex : maxIndex,
			0,
		)

		if (
			lastWinnerOdds[indexOfFavourite] - firstWinnerOdds[indexOfFavourite] >=
			3
		) {
			return true
		}

		return false
	}
}
