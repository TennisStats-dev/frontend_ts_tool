import type { IMatchResponse, IPreMatchResponse } from './axiosResponse'

export interface IDateRange {
	from: Date
	to: Date
}

export interface IMatchesGroupedByTournament {
	id: number
	name: string
	matches: Array<IPreMatchResponse | IMatchResponse>
}

export interface ITournamentsGroupedByCircuit {
	name: string
	tournaments: IMatchesGroupedByTournament[]
}

export interface IMatchPlayersStats {
	home: IPlayerStats
	away: IPlayerStats
	h2h: IMatchResponse[]
	isFixed?: boolean
}

export interface IPlayerStats {
	tournament: IPeriodStats
	year: IPeriodStats
	all: IPeriodStats
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
	matches: IMatchResponse[]
	stats: {
		all: IStats
		onSurface: IStats
	}
}

export interface IStats {
	victories: IMatchResponse[]
	acesAvg: number
	dfAvg: number
	gamesAvg: number
}
