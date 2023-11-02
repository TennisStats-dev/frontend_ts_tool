const getDayScheduleEndpoint = (): string => {
	return `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_SCHEDULE_PATH}`
}
const getPlayerStatsByRangeEndpoint = (): string => {
	return `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_PLAYER_STATS_RANGE_PATH}`
}
const getPlayerStatsEndpoint = (): string => {
	return `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_PLAYER_STATS_PATH}`
}

export const endpointsAPI = {
	getDayScheduleEndpoint,
	getPlayerStatsByRangeEndpoint,
	getPlayerStatsEndpoint
}
