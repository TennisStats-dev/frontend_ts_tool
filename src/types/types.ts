import type { IMatchResponse, IPreMatchResponse } from './axiosResponse'

export interface IDateRange {
	from: Date
	to: Date
}

export interface IMatchesGroupedByCourt {
	courtId: number
	courtName: string
	groupedMatches: Array<IPreMatchResponse | IMatchResponse>
}

export interface IMatchesGroupedByTournament {
	id: number
	name: string
	matches: Array<IPreMatchResponse | IMatchResponse>
}

export interface IMatchesGroupedByTournamentAndDay {
	id: number
	name: string
	groupedMatches: Array<{
		day: string
		matches: Array<IPreMatchResponse | IMatchResponse>
	}>
}

export interface ITournamentsGroupedByCircuit {
	name: string
	tournaments: IMatchesGroupedByTournamentAndDay[]
}

export type IMatchesStats = IMatchPlayersStats[]

export interface IMatchPlayersStats {
	matchId: number
	home: IPlayerStats
	away: IPlayerStats
	h2h: IMatchResponse[]
	isFixed?: boolean
}

export interface IPlayerStats {
	totalSample: IMatchResponse[]
	tournamentStats: Pick<IPeriodStats, 'all'>
	yearStats: IPeriodStats
	careerStats: IPeriodStats
	lastMatches: IMatchResponse[]
	redFlag?: IMatchResponse[]
	yellowFlag?: IMatchResponse[]
	vsSimilarRivals?: {
		won: IMatchResponse[]
		sample: IMatchResponse[]
	}
	greenFlag?: IMatchResponse[]
	restTime?: string
	playsBothTypes?: IMatchResponse[]
}

export interface IPeriodStats {
	all: IStats | 0
	onSurface: IStats | 0
}

export interface IStats {
	victories: {
		total: IMatchResponse[]
		sample: IMatchResponse[]
		percentage: number | '-'
	}
	aces: {
		average: number | '-'
		sample: number | '-'
	}
	df: {
		average: number | '-'
		sample: number | '-'
	}
	games: {
		average: number | '-'
		sample: number | '-'
	}
}
