import { api } from '../API'

export const matchRound = {
	[api.constants.matchRounds[14]]: 'QR1',
	[api.constants.matchRounds[15]]: 'QR2',
	[api.constants.matchRounds[16]]: 'QR3',
	[api.constants.matchRounds[17]]: 'QR4',
	[api.constants.matchRounds[19]]: 'QR',
	[api.constants.matchRounds[23]]: 'R128',
	[api.constants.matchRounds[24]]: 'R64',
	[api.constants.matchRounds[25]]: 'R32',
	[api.constants.matchRounds[26]]: 'R16',
	[api.constants.matchRounds[27]]: 'QF',
	[api.constants.matchRounds[28]]: 'SF',
	[api.constants.matchRounds[29]]: 'F',
	[api.constants.matchRounds[44]]: 'QR',
	[api.constants.matchRounds[54]]: 'QR',
	[api.constants.matchRounds[62]]: 'QR',
} as const

// Status description
// export const matchStatus = {
// 	[api.constants.matchStatus.notStarted]: {
// 		code: 0,
// 		description: 'Not started',
// 	},
// 	[api.constants.matchStatus.inplay]: {
// 		code: 1,
// 		description: 'Inplay',
// 	},
// 	[api.constants.matchStatus.toBeFixed]: {
// 		code: 2,
// 		description: 'To be fixed',
// 	},
// 	[api.constants.matchStatus.ended]: {
// 		code: 3,
// 		description: 'Ended',
// 	},
// 	[api.constants.matchStatus.postponed]: {
// 		code: 4,
// 		description: 'Postponed',
// 	},
// 	[api.constants.matchStatus.cancelled]: {
// 		code: 5,
// 		description: 'Cancelled',
// 	},
// 	[api.constants.matchStatus.walkover]: {
// 		code: 6,
// 		description: 'Walkover',
// 	},
// 	[api.constants.matchStatus.interrupted]: {
// 		code: 7,
// 		description: 'Interrupted',
// 	},
// 	[api.constants.matchStatus.abandoned]: {
// 		code: 8,
// 		description: 'Abandoned',
// 	},
// 	[api.constants.matchStatus.retired]: {
// 		code: 9,
// 		description: 'Retired',
// 	},
// 	[api.constants.matchStatus.suspended]: {
// 		code: 10,
// 		description: 'Suspended',
// 	},
// 	[api.constants.matchStatus.decidedByFA]: {
// 		code: 11,
// 		description: 'Decided by FA',
// 	},
// 	[api.constants.matchStatus.removed]: {
// 		code: 11,
// 		description: 'Removed',
// 	}
// } as const

export const matchStatus = {
	[api.constants.matchStatus[0]]: 0,
	[api.constants.matchStatus[1]]: 1,
	[api.constants.matchStatus[2]]: 2,
	[api.constants.matchStatus[3]]: 3,
	[api.constants.matchStatus[4]]: 4,
	[api.constants.matchStatus[5]]: 5,
	[api.constants.matchStatus[6]]: 6,
	[api.constants.matchStatus[7]]: 7,
	[api.constants.matchStatus[8]]: 8,
	[api.constants.matchStatus[9]]: 9,
	[api.constants.matchStatus[10]]: 10,
	[api.constants.matchStatus[11]]: 11,
	[api.constants.matchStatus[99]]: 99,
} as const

export const endedMatchStatus = [3, 5, 6, 8, 9]

export const grounds = {
	[api.constants.ground.clay]: {
		surface: 'Clay',
		location: 'Outdoor',
	},
	[api.constants.ground.grass]: {
		surface: 'Grass',
		location: 'Outdoor',
	},
	[api.constants.ground.hardOutdoor]: {
		surface: 'Hard',
		location: 'Outdoor',
	},
	[api.constants.ground.hardIndoor]: {
		surface: 'Hard',
		location: 'Indoor',
	},
	[api.constants.ground.carpetOutdoor]: {
		surface: 'Carpet',
		location: 'Outdoor',
	},
	[api.constants.ground.carpetIndoor]: {
		surface: 'Carpet',
		location: 'Indoor',
	},
	[api.constants.ground.syntheticOutdoor]: {
		surface: 'Carpet',
		location: 'Outdoor',
	},
	[api.constants.ground.syntheticIndoor]: {
		surface: 'Carpet',
		location: 'Indoor',
	},
} as const

const groundsArray = Array.from(Object.values(grounds))

export const surfaceArray = groundsArray.map(({ surface }) => surface)
export const locationArray = groundsArray.map(({ location }) => location)

export const gender = {
	male: 'M',
	female: 'F',
} as const

export const genderArray = Array.from(Object.values(gender))

export const gameResult = {
	p15_0: '15-0',
	p0_15: '0-15',
	p15_15: '15-15',
	p30_15: '30-15',
	p15_30: '15-30',
	p30_30: '30-30',
	p40_30: '40-30',
	p30_40: '30-40',
	p40_40: '40-40',
	pA_40: 'A-40',
	p40_A: '40-A',
} as const

export const gameResultArray = Array.from(Object.values(gameResult))

export const circuitArray = api.constants.circuit

export const type = {
	men: 'M',
	women: 'W',
	menDoubles: 'MD',
	womenDoubles: 'WD',
	menMixed: 'M_MD',
	menMixedOld: 'M - MD'
} as const

export const typeArray = Array.from(Object.values(type))

export const bestOfSets = {
	[api.constants.bestOfSets[3]]: 3,
	[api.constants.bestOfSets[5]]: 5,
} as const
