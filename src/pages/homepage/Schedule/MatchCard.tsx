import { useState } from 'react'
import { flagsObject } from '../../../constants/countries'
import type { IMatch } from '../../../types/databaseTypes'
import { formatDate } from '../../../utils/formatDate'
import { StatsCard } from './StatsCard'
import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../../types/axiosResponse'
import worldFlag from '../../../assets/world.png'

interface Props {
	match: IMatchResponse | IPreMatchResponse
	index: number
}

interface IResultData {
	score: IMatch['match_stats']['result']
	winner: IMatch['match_stats']['winner']
}

export const MatchCard = ({ match, index }: Props): JSX.Element => {
	const [displayStats, setDisplayStats] = useState(false)
	const countryHome = match.home.cc?.toUpperCase()
	const countryAway = match.away.cc?.toUpperCase()
	const result: IResultData = {
		score: (match as IMatch)?.match_stats?.result,
		winner: (match as IMatch)?.match_stats?.winner,
	}

	const date = formatDate(new Date(match.est_time))

	return (
		<li
			key={index}
			className={`${index !== 0 ? 'border-t-2' : null} border-bg-slate-400 p-2`}
		>
			<div className="grid grid-cols-6">
				<div className="col-start-2 col-span-4 grid grid-cols-3">
					<div className="flex gap-1 justify-self-end items-center">
						<p>{match.home.name}</p>
						{countryHome !== undefined ? (
							<img
								className="h-7 w-7"
								src={flagsObject[countryHome].image}
								alt={`Flag from ${flagsObject[countryHome]}`}
							></img>
						) : (
							<div className='w-7 h-7 px-0.5 flex items-center'>
								<img
									className="h-4 border border-black"
									src={worldFlag}
									alt={'Flag from the world'}
								></img>
							</div>
						)}
					</div>

					{result.score !== undefined && result.winner !== undefined ? (
						<div className="justify-self-center">
							<h1>{result.score}</h1>
							<p>{match.api_id}</p>
						</div>
					) : (
						<div className="justify-self-center flex flex-col items-center">
							<p>{date}</p>
							<p>{match.court?.name}</p>
							<p>{match.api_id}</p>
						</div>
					)}

					<div className="flex gap-1 justify-self-start items-center">
						{countryAway !== undefined && (
							<img
								className="h-7 w-7"
								src={flagsObject[countryAway].image}
								alt={`Flag from ${flagsObject[countryAway]}`}
							></img>
						)}
						<p>{match.away.name}</p>
					</div>
				</div>
				<div className="justify-self-end pr-4 self-center">
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
			{displayStats && <StatsCard match={match}></StatsCard>}
		</li>
	)
}
