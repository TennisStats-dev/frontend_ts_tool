import { useEffect, useState } from 'react'
import type { IMatch } from '../../../types/databaseTypes'
import { api } from '../../../API'
import type { IMatchPlayersData } from '../../../types/types'
import { sortByDate } from '../../../services/match/sortByDate'
import { MatchCard } from './MatchCard'

interface Props {
	homeApiId: number
	awayApiId: number
}

export const StatsCard = ({ homeApiId, awayApiId }: Props): JSX.Element => {
	const [matches, setMatches] = useState<IMatchPlayersData>()

	useEffect(() => {
		const playersData = async (): Promise<IMatchPlayersData> => {
			const homeMatches = await api.services.getPeriodMatches(homeApiId, 1, 0)
			const awayMatches = await api.services.getPeriodMatches(awayApiId, 1, 0)

			console.log('------- PARTIDOS HOME --------------\n', homeMatches)
			console.log('------- PARTIDOS AWAY --------------\n', awayMatches)

			const sortedHomeMatches = sortByDate(homeMatches) as IMatch[]
			const sortedAwayMatches = sortByDate(awayMatches) as IMatch[]

			return {
				home: sortedHomeMatches,
				away: sortedAwayMatches,
			}
		}

		playersData()
			.then((res) => {
				setMatches(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<section>
			<div>
				{matches?.home.splice(0, 5).map((match, index) => {
					return (
						<MatchCard key={match.api_id} match={match} index={index}></MatchCard>
					)
				})}
			</div>
			<div>
				{matches?.away.splice(0, 5).map((match, index) => {
					return (
						<MatchCard key={match.api_id} match={match} index={index}></MatchCard>
					)
				})}
			</div>
		</section>
	)
}
