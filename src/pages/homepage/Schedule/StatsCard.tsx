import { useEffect, useState } from 'react'
import type { IMatchPlayersStats } from '../../../types/types'
import {
	getH2H,
	getIsFixed,
	getPlayerStats,
} from '../../../services/stats/getPlayerStats'
import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../../types/axiosResponse'

interface Props {
	match: IMatchResponse | IPreMatchResponse
}

export const StatsCard = ({ match }: Props): JSX.Element => {
	const [matchData, setMatchData] = useState<IMatchPlayersStats>()

	useEffect(() => {
		const matchStats = async (): Promise<IMatchPlayersStats> => {
			const home = await getPlayerStats(match, match.home)
			const away = await getPlayerStats(match, match.away)
			const h2h = getH2H(home.all.matches, match.away)
			const isFixed = getIsFixed(match)

			return {
				home,
				away,
				h2h,
				isFixed,
			}
		}

		matchStats()
			.then((res) => {
				setMatchData(() => res)
                console.log(matchData)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return <section></section>
}
