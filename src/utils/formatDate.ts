export const formatTime = (date: Date): string => {
	const hour = date.getHours()
    const formattedHour = hour < 10 ? `0${hour}` : hour
    const minutes = date.getMinutes()
    const formattedMinutes = ((minutes < 10) ? '0' : '') + minutes

	return `${formattedHour}:${formattedMinutes}`
}

export const formatDay = (date: Date): string => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}
