export const formatDate = (date: Date): string => {
	const hour = date.getHours()
    const formattedHour = hour < 10 ? `0${hour}` : hour
    const minutes = date.getMinutes()
    const formattedMinutes = ((minutes < 10) ? '0' : '') + minutes

	return `${formattedHour}:${formattedMinutes}`
}
