const getDayScheduleEndpoint = (): string => {
	return `${process.env.API_BASE_URL}${process.env.API_SCHEDULE_PATH}`
}

export const endpointsAPI = {
	getDayScheduleEndpoint
}
