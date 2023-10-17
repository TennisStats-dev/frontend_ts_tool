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
	index: number
	homePlayerApiId: number
}

export const H2HEndedMatchCard = ({
	match,
	index,
	homePlayerApiId,
}: Props): JSX.Element => {
	const [displayStats, setDisplayStats] = useState(false)
	const countryHome = match.home.cc?.toUpperCase()
	const countryAway = match.away.cc?.toUpperCase()
	let reverse = false
	let result = getMatchResult(match.match_stats.result)

	const homePlayer:
		| Pick<IPlayerResponse, 'name' | 'cc'>
		| Pick<IDoublesPlayerResponse, 'name' | 'cc'> =
		match.home.api_id === homePlayerApiId
			? {
					name: match.home.name,
					cc: countryHome,
			  }
			: {
					name: match.away.name,
					cc: countryAway,
			  }

	const awayPlayer:
		| Pick<IPlayerResponse, 'name' | 'cc'>
		| Pick<IDoublesPlayerResponse, 'name' | 'cc'> =
		match.away.api_id !== homePlayerApiId
			? {
					name: match.away.name,
					cc: countryAway,
			  }
			: {
					name: match.home.name,
					cc: countryHome,
			  }

	if (typeof result !== 'string' && match.home.api_id !== homePlayerApiId) {
		result = result.map((set) => set.split('-').reverse().join('-'))
	}

	if (match.home.api_id !== homePlayerApiId) {
		reverse = true
	}

	// const date = formatDate(new Date(match.est_time))

	return (
		<li
			key={index}
			className={`${index !== 0 ? 'border-t-2' : null} border-bg-slate-400 p-2`}
		>
			<div className="grid grid-cols-6">
				<div>
					<p>{match.pre_odds?.first.win[0]}</p>
				</div>
				<div className="col-start-2 col-span-4 grid grid-cols-3">
					<div className="flex gap-1 justify-self-end items-center">
						<p>{homePlayer.name}</p>
						{homePlayer.cc !== undefined ? (
							<img
								className="h-7 w-7"
								src={flagsObject[homePlayer.cc].image}
								alt={`Flag from ${flagsObject[homePlayer.cc]}`}
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
					<div className="justify-self-center flex flex-col items-center">
						<h1>{result}</h1>
						<p>{match.api_id}</p>
					</div>
					<div className="flex gap-1 justify-self-start items-center">
						{awayPlayer.cc !== undefined && (
							<img
								className="h-7 w-7"
								src={flagsObject[awayPlayer.cc].image}
								alt={`Flag from ${flagsObject[awayPlayer.cc]}`}
							></img>
						)}
						<p>{awayPlayer.name}</p>
					</div>
				</div>
				<div className="justify-self-end pr-4 self-center">
					<p>{match.pre_odds?.first.win[1]}</p>
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
		</li>
	)
}
