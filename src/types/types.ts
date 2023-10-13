import type { IMatch, IPreMatch } from './databaseTypes'

export interface IDateRange {
	from: Date
	to: Date
}

export interface IMatchesGroupedByTournament {
	id: number
	name: string
	matches: Array<IPreMatch | IMatch>
}

export interface ITournamentsGroupedByCircuit {
	name: string
	tournaments: IMatchesGroupedByTournament[]
}

export interface IMatchPlayersData {
	home: IMatch[]
	away: IMatch[]
}

export interface IMatchPlayersStats {
	home: IPlayerStats
	away: IPlayerStats
	h2h: IMatch[]
	isFixed: boolean
}

export interface IPlayerStats {
	tournament: IPeriodStats
	year: IPeriodStats
	all: IPeriodStats
	lastMatches: IMatch[]
	redFlag: IMatch[]
	yellowFlag: IMatch[]
	greenFlag: IMatch[]
	VsSimilarRivals: {
		won: IMatch[]
		sample: IMatch[]
	}
	restTime: string
	playsBothTypes: boolean
}

export interface IPeriodStats {
	matches: IMatch[]
	stats: {
		victories: IMatch[]
		acesAvg: number
		dfAvg: number
		gamesAvg: number
	}
}
