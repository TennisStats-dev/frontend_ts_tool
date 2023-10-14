import type { IMatch, IMatchStats, IPlayer, IPreMatch } from './databaseTypes'

export interface IPlayerResponse extends IPlayer {
	_id: string
}

export interface IDoublesPlayerResponse extends IPlayer {
	_id: string
	team: {
		p1: IPlayerResponse
		p2?: IPlayerResponse
	}
}

export interface IPreMatchResponse extends IPreMatch {
	_id: string
	home: IPlayerResponse | IDoublesPlayerResponse
	away: IPlayerResponse | IDoublesPlayerResponse
}

export interface IMatchResponse extends IMatch {
	_id: string
	home: IPlayerResponse | IDoublesPlayerResponse
	away: IPlayerResponse | IDoublesPlayerResponse
	match_stats: IMatchStatsResponse
}

export interface IMatchStatsResponse extends IMatchStats {
	winner: string | undefined
}

export interface IAxiosResponse<T> {
	result: T
}
