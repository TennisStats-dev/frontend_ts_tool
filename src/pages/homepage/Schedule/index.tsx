import { api } from '../../../API'
import { useEffect, useState } from 'react'
import { groupMatchesByTournament } from '../../../services/match/groupMatchesByTorunament'
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

export const Schedule = (): JSX.Element => {
	// const [dayToSearch, setDayToSearch] = useState(0)
	const [schedule, setSchedule] = useState<ITournamentsGroupedByCircuit[]>()

	useEffect(() => {
		const scheduleData = async (): Promise<ITournamentsGroupedByCircuit[]> => {
			const matches = await api.services.getDateSchedule(0)

			const sortedByDate = sortScheduleByDate(matches)
			const groupedByTournament = groupMatchesByTournament(sortedByDate)
			const groupedByCircuit = groupTournamentsByCircuit(groupedByTournament)
			return groupedByCircuit
		}

		scheduleData()
			.then((res) => {
				setSchedule(res)
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
