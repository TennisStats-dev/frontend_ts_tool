import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../../types/axiosResponse'
import type { IMatchPlayersStats } from '../../../types/types'
import { ShortEndedMatchCard } from '../../MatchCards/ShortEndedMatchCard'

interface Props {
	matchData: IMatchPlayersStats
	upcomingMatch: IMatchResponse | IPreMatchResponse
}

export const LastMatches = ({
	matchData,
	upcomingMatch,
}: Props): JSX.Element => {
	console.log('home player', upcomingMatch.home.name)
	console.log('away player', upcomingMatch.away.name)

	return (
		<>
			<div>Last matches</div>
			<div className="grid grid-flow-col grid-cols-7">
				<ul className="col-span-3">
					{matchData.home.totalSample.slice(0, 5).map((match, index) => {
						return (
							<li
								key={`sm${match.api_id}`}
								className={`${
									index !== 0 ? 'border-t-2' : null
								} border-bg-slate-400 p-2`}
							>
								<ShortEndedMatchCard
									match={match}
									involvedPlayerApiId={upcomingMatch.home.api_id}
								></ShortEndedMatchCard>
							</li>
						)
					})}
				</ul>
				<div className=""></div>
				<ul className="col-span-3">
					{matchData.away.totalSample.slice(0, 5).map((match, index) => {
						return (
							<li
								key={`sm${match.api_id}`}
								className={`${
									index !== 0 ? 'border-t-2' : null
								} border-bg-slate-400 p-2`}
							>
								<ShortEndedMatchCard
									match={match}
									involvedPlayerApiId={upcomingMatch.away.api_id}
								></ShortEndedMatchCard>
							</li>
						)
					})}
				</ul>
			</div>
		</>
	)
}
