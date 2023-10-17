import { useState } from 'react'
// import { formatDate } from '../../utils/formatDate'
import { flagsObject } from '../../constants/countries'
import worldFlag from '../../assets/world.png'
import type {
	IDoublesPlayerResponse,
	IMatchResponse,
	IPlayerResponse,
} from '../../types/axiosResponse'
import { EndedMatchStatsCard } from '../EndedMatchStatsCard'
import { getMatchResult } from '../../services/match/getMatchResult'

interface Props {
	match: IMatchResponse
	involvedPlayerApiId: number
}

export const ShortEndedMatchCard = ({
	match,
	involvedPlayerApiId,
}: Props): JSX.Element => {
	const [displayStats, setDisplayStats] = useState(false)
	const countryHome = match.home.cc?.toUpperCase()
	const countryAway = match.away.cc?.toUpperCase()
	let reverse = false
	let result = getMatchResult(match.match_stats.result)

	const rivalData:
		| Pick<IPlayerResponse, 'name' | 'cc'>
		| Pick<IDoublesPlayerResponse, 'name' | 'cc'> =
		match.home.api_id === involvedPlayerApiId
			? {
					name: match.away.name,
					cc: countryAway,
			  }
			: {
					name: match.home.name,
					cc: countryHome,
			  }

	if (match.home.api_id !== involvedPlayerApiId) {
		reverse = true
	}

	if (typeof result !== 'string' && reverse) {
		result = result.map((set) => set.split('-').reverse().join('-'))
	}

	// const odds = match.pre_odds?.first.win

	const odds = reverse
		? match.pre_odds?.first.win.reverse()
		: match.pre_odds?.first.win

	// const date = formatDate(new Date(match.est_time))

	return (
		<>
			<div className="grid grid-cols-4">
				<div className="grid grid-cols-2">
					{odds !== undefined && (
						<p className="justify-self-center">{match.pre_odds?.first.win[0]}</p>
					)}
					<div>VS</div>
				</div>
				<div>
					<p>
						{result} | {match.api_id}
					</p>
				</div>
				<div>
					<div className="grid grid-cols-2 gap-1 justify-self-end">
						<p>{rivalData.name}</p>
						{rivalData.cc !== undefined ? (
							<img
								className="h-7 w-7"
								src={flagsObject[rivalData.cc].image}
								alt={`Flag from ${flagsObject[rivalData.cc]}`}
							></img>
						) : (
							<div className="w-7 h-7 px-0.5 flex items-center">
								<img
									className="h-4 border border-black"
									src={worldFlag}
									alt={'Flag from the world'}
								></img>
							</div>
						)}
					</div>
					d
				</div>
				<div className="justify-self-end pr-4 self-center">
					{odds !== undefined && <p>{match.pre_odds?.first.win[1]}</p>}
					<button
						className="p-2 hover:bg-primary-100 rounded-full"
						onClick={() => {
							setDisplayStats(!displayStats)
						}}
					>
						<svg
							data-accordion-icon
							className={`w-3 h-3 shrink-0 ${displayStats ? 'rotate-180' : null}`}
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 10 6"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 5 5 1 1 5"
							/>
						</svg>
					</button>
				</div>
			</div>
			{displayStats && (
				<EndedMatchStatsCard match={match} reverse={reverse}></EndedMatchStatsCard>
			)}
		</>
	)
}
