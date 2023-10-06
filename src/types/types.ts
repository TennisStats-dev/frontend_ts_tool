import type { IMatch, IPreMatch } from './databaseTypes'

export interface IDateRange {
	from: Date
	to: Date
}

export interface IMatchesGroupedByTournament {
	tournamentId: number
	matches: Array<IPreMatch | IMatch>
}
