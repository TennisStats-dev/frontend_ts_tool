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

	const tournamentMatches = yearMatches.filter((match) => {
		const startingPeriod = getDateBeforeXDays(new Date(matchData.est_time), 15)

		return (
			match.tournament.api_id === matchData.tournament.api_id &&
			new Date(match.est_time) >= startingPeriod
		)
	})

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
		tournamentStats: {
			all: calculateStatsFromMatchArray(tournamentMatches, playerData),
		},
		yearStats: {
			all: calculateStatsFromMatchArray(yearMatches, playerData),
			onSurface: calculateStatsFromMatchArray(
				yearMatches,
				playerData,
				matchData.tournament.ground?.surface,
			),
		},
		careerStats: {
			all: calculateStatsFromMatchArray(nonRetiredAllMatches, playerData),
			onSurface: calculateStatsFromMatchArray(
				nonRetiredAllMatches,
				playerData,
				matchData.tournament.ground?.surface,
			),
		},
		lastMatches: allMatches.splice(-5),
		...yearStats,
		greenFlag,
	}
}

const calculateStatsFromMatchArray = (
	matches: IMatchResponse[],
	playerData: IPlayerResponse,
	surface?: Surface,
): IStats => {
	if (surface !== undefined) {
		matches = matches.filter(
			(match) => match.tournament.ground?.surface === surface,
		)
	}

	const victories = matches.filter((match) => {
		return match.match_stats.winner === playerData._id
	})

	const acesArray: number[] = []
	const dfArray: number[] = []
	const gamesArray: number[] = []

	matches.forEach((match) => {
		const { aces, df, result } = match.match_stats
		const indexOfPlayer = match.home.api_id === playerData.api_id ? 0 : 1

		if (aces?.[indexOfPlayer] !== undefined) {
			acesArray.push(aces[indexOfPlayer])
		}

		if (df?.[indexOfPlayer] !== undefined) {
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

			const addedGames = notSuperTieBreaksSets.map((set) => {
				return set[0] + set[1]
			})

			if (addedGames.length > 0) {
				gamesArray.push(addedGames.reduce((a, b) => a + b))
			}
		}
	})

	if (acesArray.length === 4) {
		console.log('array de aces del torneo', acesArray)
	}

	const acesAvg =
		Math.round(
			(acesArray.reduce(
				(accumulator, currentValue) => accumulator + currentValue,
			) /
				acesArray.length) *
				10,
		) / 10
	const dfAvg =
		Math.round(
			(dfArray.reduce((accumulator, currentValue) => accumulator + currentValue) /
				dfArray.length) *
				10,
		) / 10
	const gamesAvg =
		Math.round(
			(gamesArray.reduce(
				(accumulator, currentValue) => accumulator + currentValue,
			) /
				gamesArray.length) *
				10,
		) / 10

	return {
		victories: {
			total: victories,
			sample: matches,
			percentage: Math.round((victories.length * 100) / matches.length),
		},
		aces: {
			average: acesAvg,
			sample: acesArray.length,
		},
		df: {
			average: dfAvg,
			sample: dfArray.length,
		},
		games: {
			average: gamesAvg,
			sample: gamesArray.length,
		},
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

		if (playerOdd <= 1.05 && winner !== playerData._id) {
			redFlag.push(match)
		}

		if (playerOdd <= 1.2 && winner !== playerData._id) {
			yellowFlag.push(match)
		}
	})

	const vsSimilarRivalsVictories = vsSimilarRivalSample.filter((match) => {
		return match.match_stats.winner === playerData._id
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
