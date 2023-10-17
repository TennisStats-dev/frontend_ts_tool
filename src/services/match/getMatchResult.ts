import type { IMatchResponse } from '../../types/axiosResponse'

export const getMatchResult = (
	result: IMatchResponse['match_stats']['result'],
): string | string[] => {
	if (typeof result !== 'string') {
		return result
	}

	switch (result) {
		case undefined:
			return 'Not updated'
		case 'home':
			return 'Retired'
		case 'away':
			return 'Retired'
		case 'cancelled':
			return 'Cancelled'
        case 'Not updated': return 'Not updated'
	}
}
