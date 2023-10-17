import { api } from '../../../API'
import { useEffect, useState } from 'react'
import { groupMatchesByTournament } from '../../../services/match/groupMatchesByTournament'
import type { ITournamentsGroupedByCircuit } from '../../../types/types'
import atp_black from '../../../assets/atp_black.png'
import atp_blue from '../../../assets/atp_blue.jpg'
import atp_white from '../../../assets/atp_white.jpg'
import ch_black from '../../../assets/ch_black.png'
import ch_white from '../../../assets/ch_white.png'
import itf from '../../../assets/itf.png'
import utr from '../../../assets/utr.png'
import wta from '../../../assets/wta.jpg'
import { groupTournamentsByCircuit } from '../../../services/match/groupTournamentsByCircuit'
import { CircuitCard } from './CircuitCard'
import { sortScheduleByDate } from '../../../services/match/sortByDate'
// import { getMatchStats } from '../../../services/stats/getMatchStats'
import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../../types/axiosResponse'
import { msToStringTime } from '../../../utils/msToStringTime'
import { groupTournamentMatchesByDay } from '../../../services/match/groupTournamentMatchesByDate'
import { groupScheduleMatchesByCourt } from '../../../services/match/groupScheduleMatchesByCourt'

export const Schedule = (): JSX.Element => {
	// const [dayToSearch, setDayToSearch] = useState(0)
	const [schedule, setSchedule] = useState<ITournamentsGroupedByCircuit[]>()
	// const { setMatchesStats } = useContext(StatsContext)

	useEffect(() => {
		const scheduleData = async (): Promise<
			Array<IMatchResponse | IPreMatchResponse> | IMatchResponse[]
		> => {
			const startTime = new Date()
			const matches = await api.services.getDateSchedule(0)
			const endTime = new Date()
			console.log(msToStringTime(endTime.getTime() - startTime.getTime()))

			return matches
		}

		scheduleData()
			.then(async (res) => {
				const sortedByDate = sortScheduleByDate(res)
				const groupedByCourt = groupScheduleMatchesByCourt(sortedByDate)
				console.log(groupedByCourt)
				const groupedByTournament = groupMatchesByTournament(sortedByDate)
				const groupedTournamentMatchesByDay = groupTournamentMatchesByDay(groupedByTournament)
				// console.log(groupedTournamentMatchesByDay)
				const groupedByCircuit = groupTournamentsByCircuit(groupedTournamentMatchesByDay)

				setSchedule(groupedByCircuit)

				// const getMatchStatsPromises = res.map(async (match) => {
				// 	return await getMatchStats(match)
				// })

				// const resolvedPromises = await Promise.all(getMatchStatsPromises)

				// setMatchesStats(resolvedPromises)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	if (schedule !== undefined) {
		return (
			<section className="px-4 lg:px-6 py-2.5">
				<div className="pt-8 bg-slate-400">
					<img className="h-4" src={atp_black}></img>
					<img className="h-8" src={atp_blue}></img>
					<img className="h-8" src={atp_white}></img>
					<img className="h-6" src={ch_black}></img>
					<img className="h-8" src={ch_white}></img>
					<img className="h-6" src={itf}></img>
					<img className="h-8" src={utr}></img>
					<img className="h-8" src={wta}></img>
				</div>
				<ul className="mx-auto max-w-screen-xl pt-8">
					{schedule.map((circuit) => {
						return <CircuitCard key={circuit.name} circuit={circuit}></CircuitCard>
					})}
				</ul>
			</section>
		)
	} else {
		return <p>Not matches found</p>
	}
}
