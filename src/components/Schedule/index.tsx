import { api } from '../../API'
import { useEffect, useState } from 'react'
import { groupArrayBy } from '../../utils/groupArrayBy'
import type { IMatchesGroupedByTournament } from '../../types/types'

export const Schedule = (): JSX.Element => {
	// const [dayToSearch, setDayToSearch] = useState(0)
	const [schedule, setSchedule] = useState<IMatchesGroupedByTournament[]>()

	useEffect(() => {
		const scheduleData = async (): Promise<IMatchesGroupedByTournament[]> => {
			const response = await api.services.getDateSchedule(0)
			const groupedByTournament = groupArrayBy(response)

			console.log(groupedByTournament)
			return groupedByTournament
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
			<section>
				<ul>
					{schedule.map((tournament) => {
						return (
							<li key={tournament.tournamentId}>
								<p>{tournament.matches[0].tournament.name}</p>
							</li>
						)
					})}
				</ul>
			</section>
		)
	} else {
		return <p>Not matches found</p>
	}
}
