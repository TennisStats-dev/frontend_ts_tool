import { useState } from 'react'
import { flagsObject } from '../../../constants/countries'
import type { IMatch, IPreMatch } from '../../../types/databaseTypes'
import { formatDate } from '../../../utils/formatDate'
// import { StatsCard } from './StatsCard'

interface Props {
	match: IMatch | IPreMatch
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
			className="border border-solid border-sky-500 rounded mb-2 p-2"
		>
			<div className="grid grid-cols-6">
				<div className="col-start-2 col-span-4 grid grid-cols-3">
					<div className="flex gap-1 justify-self-end items-center">
						<p>{match.home.name}</p>
						{countryHome !== undefined && (
							<img
								className="h-7 w-7"
								src={flagsObject[countryHome].image}
								alt={`Flag from ${flagsObject[countryHome]}`}
							></img>
						)}
					</div>

					{result.score !== undefined && result.winner !== undefined ? (
						<div className="justify-self-center">
							<h1>{result.score}</h1>
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
				<button
					className="justify-self-end p-3"
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
			{/* {displayStats && (
				<StatsCard
                match={match}
				></StatsCard>
			)} */}
		</li>
	)
}
