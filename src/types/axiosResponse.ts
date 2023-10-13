import type { IMatch, IPlayer, IPreMatch } from './databaseTypes'

export interface IPlayerResponse extends IPlayer {
	_id: string
}
export interface IMatchResponse extends IMatch {
	_id: string
}
export interface IPreMatchResponse extends IPreMatch {
	_id: string
}

export interface IAxiosResponse<T> {
    result: T
}
