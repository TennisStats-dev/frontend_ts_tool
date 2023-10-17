import { api } from '../../API'
import type {
	IDoublesPlayerResponse,
	IMatchResponse,
	IPlayerResponse,
	IPreMatchResponse,
} from '../../types/axiosResponse'
import type { Surface } from '../../types/databaseTypes'
import type {
	IMatchPlayersStats,
	IPeriodStats,
	IPlayerStats,
} from '../../types/types'
import { getDateBeforeXDays, getDateRange } from '../../utils/getDates'
import { msToStringTime } from '../../utils/msToStringTime'
import { sortEndedMatchesByDate } from '../match/sortByDate'

export const getMatchStats = async (
	match: IMatchResponse | IPreMatchResponse,
): Promise<IMatchPlayersStats> => {
	// const promises = [getPlayerStats(match, match.home), getPlayerStats(match, match.away)]
	const res = await Promise.all([
		getPlayerStats(match, match.home),
		getPlayerStats(match, match.away),
	])

	const home = res[0]
	const away = res[1]
	const h2h = getH2H(home.totalSample, match.away)
	const isFixed = getIsFixed(match)

	return {
		matchId: match.api_id,
		home,
		away,
		h2h,
		isFixed,
	}
}

const getPlayerStats = async (
	matchData: IMatchResponse | IPreMatchResponse,
	playerData: IPlayerResponse,
): Promise<IPlayerStats> => {
	const startTime = new Date()
	const allMatches = await api.services.getAllPlayerMatches(playerData.api_id)
	const endTime = new Date()
	console.log(msToStringTime(endTime.getTime() - startTime.getTime()))

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
			new Date(match.est_time) >= startingPeriod &&
			new Date(match.est_time) <= new Date(matchData.est_time)
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
		totalSample: allMatches,
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
): IPeriodStats['all'] => {
	if (surface !== undefined) {
		matches = matches.filter(
			(match) => match.tournament.ground?.surface === surface,
		)
	}

	if (matches.length === 0) {
		return 0
	}

	const victories = matches.filter((match) => {
		return match.match_stats.winner === playerData._id
	})

	const victoriesPercentage =
		victories.length > 0
			? Math.round((victories.length * 100) / matches.length)
			: 0

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

	const acesAvg =
		acesArray.length === 0
			? 0
			: Math.round(
					(acesArray.reduce(
						(accumulator, currentValue) => accumulator + currentValue,
					) /
						acesArray.length) *
						10,
			) / 10
	const dfAvg =
		dfArray.length === 0
			? 0
			: Math.round(
					(dfArray.reduce(
						(accumulator, currentValue) => accumulator + currentValue,
					) /
						dfArray.length) *
						10,
			) / 10
	const gamesAvg =
		gamesArray.length === 0
			? 0
			: Math.round(
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
			percentage: victoriesPercentage,
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

const getH2H = (
	playerMatches: IMatchResponse[],
	rivalPlayer: IPlayerResponse,
): IMatchResponse[] => {
	const h2hMatches = playerMatches.filter(
		(match) =>
			match.home._id === rivalPlayer._id || match.away._id === rivalPlayer._id,
	)
	return h2hMatches
}

const getIsFixed = (
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
