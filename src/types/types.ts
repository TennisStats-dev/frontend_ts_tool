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
