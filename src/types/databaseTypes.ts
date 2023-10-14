import { type countriesCC } from '../constants/countries'

import type {
	matchStatus,
	matchRound,
	genderArray,
	gameResultArray,
	typeArray,
	bestOfSets,
	circuitArray,
	surfaceArray,
	locationArray
} from '../constants/data'

export type CountriesCC = (typeof countriesCC)[number]

export type Status = (typeof matchStatus)[number]

export type Round = (typeof matchRound)[number]

export type Gender = (typeof genderArray)[number]

export type Surface = (typeof surfaceArray)[number]

export type Location = (typeof locationArray)[number]

export type GameResult = (typeof gameResultArray)[number]

export type Circuit = (typeof circuitArray)[number]

export type Type = (typeof typeArray)[number]

export type BestOfSets = (typeof bestOfSets)[number]

export interface ITournament {
	api_id: number
	name: string
	circuit?: Circuit
	type: Type
	best_of_sets?: BestOfSets
	ground?: {
		surface: Surface
		location: Location
	}
	city?: string
	cc?: string
}

export interface ICourt {
	api_id: number
	name: string
}

export interface IMatchStats {
	result: string[] | 'home' | 'away' | 'cancelled' | 'Not updated'
	winner: string | undefined
	aces?: [number, number]
	df?: [number, number]
	win_1st_serve?: [number, number]
	bp?: [number, number]
}

interface IPbP {
	result: GameResult
	odds?: {
		win?: [number, number]
		win_1st_set?: [number, number]
	}
	time?: Date
}

export interface IGameStats {
	summary: string
	won_points?: [number, number]
	total_bp?: number
	total_aces?: number
	points?: IPbP[]
}

export interface ISetStats {
	number: number
	games_stats: IGameStats[]
}

export interface IPreOdds {
	last: {
		win: [string, string]
		win_1st_set?: [string, string]
		update: Date
	}
	first: {
		win: [string, string]
		win_1st_set?: [string, string]
		time: Date
	}
}

export interface IPlayer extends Document {
	api_id: number
	name: string
	gender: Gender
	birth?: Date
	cc?: string
}

export interface IDoublesPlayer {
	api_id: number
	name: string
	gender: Gender
	birth?: Date
	cc?: string
	team: {
		p1: IPlayer
		p2?: IPlayer
	}
}

export interface IPreMatch {
	api_id: number
	bet365_id?: number
	sport_id: number
	type: Type
	round?: Round
	tournament: ITournament
	court?: ICourt
	home: IPlayer | IDoublesPlayer
	away: IPlayer | IDoublesPlayer
	status: Status
	est_time: Date
	pre_odds?: IPreOdds
}

export interface IMatch extends IPreMatch {
	// b365_start_time?: Date
	// b365_end_time?: Date
	match_stats: IMatchStats
	sets_stats?: ISetStats[]
}

export interface IPlayerRanking {
	rank: number
	player: IPlayer | [IPlayer, IPlayer]
	points: number
	tourn_played: number
}

export interface IRanking {
	date: Date
	type: Type
	ranking: IPlayerRanking[]
}

export interface IMatchPlayers {
	home: IPlayer | IDoublesPlayer
	away: IPlayer | IDoublesPlayer
}

export interface IMatchPlayersObject {
	home: IPlayer | IDoublesPlayer | undefined
	away: IPlayer | IDoublesPlayer | undefined
}

export interface IResultIssue {
	matchId: number
	home: IPlayer
	away: IPlayer
	status: Status
	details: string
}

export interface INotFoundMatch {
	matchId: number
	home: {
		api_id: number
		name: string
	}
	away: {
		api_id: number
		name: string
	}
	tournament: {
		api_id: number
		name: string
	}
	details: string
}
