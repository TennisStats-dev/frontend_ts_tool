import type { IMatchPlayersStats } from '../../../types/types'
import { H2HEndedMatchCard } from '../../MatchCards/H2HEndedMatchCard'

interface Props {
	matchData: IMatchPlayersStats
	homePlayerApiId: number
}

export const H2HMatches = ({
	matchData,
	homePlayerApiId,
}: Props): JSX.Element => {
	return (
		<ul>
			{matchData.h2h.map((match, index) => {
				return (
					<li key={match.api_id}>
						<H2HEndedMatchCard
							match={match}
							index={index}
							homePlayerApiId={homePlayerApiId}
						></H2HEndedMatchCard>
					</li>
				)
			})}
		</ul>
	)
}
