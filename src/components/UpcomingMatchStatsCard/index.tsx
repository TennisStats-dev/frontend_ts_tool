import { useContext, useEffect, useState } from 'react'
import type { IMatchPlayersStats } from '../../types/types'
import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../types/axiosResponse'
import { MainStats } from './MainStats'
import { getMatchStats } from '../../services/stats/getMatchStats'
import { StatsContext } from '../../contexts/StatsContext'
import { H2HMatches } from './H2HMatches'
import { LastMatches } from './LastMatches'

interface Props {
	match: IMatchResponse | IPreMatchResponse
}

export const UpcomingMatchStatsCard = ({ match }: Props): JSX.Element => {
	const [matchData, setMatchData] = useState<IMatchPlayersStats>()
	const { matchesStats } = useContext(StatsContext)

	useEffect(() => {
		const matchStats = matchesStats?.find(
			(matchStats) => matchStats.matchId === match.api_id,
		)

		if (matchStats !== undefined) {
			setMatchData(matchStats)
		} else {
			getMatchStats(match)
				.then((res) => {
					setMatchData(() => res)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}, [])

	return (
		<>
			{matchData !== undefined && (
				<section className="border-t pt-3">
					<MainStats matchData={matchData}></MainStats>
					<H2HMatches matchData={matchData} homePlayerApiId={match.home.api_id}></H2HMatches>
					<LastMatches matchData={matchData} upcomingMatch={match}></LastMatches>
				</section>
			)}
		</>
	)
}
