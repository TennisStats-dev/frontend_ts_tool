import { useState } from 'react'
import worldFlag from '../../assets/world.png'
import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../types/axiosResponse'
import { flagsObject } from '../../constants/countries'
import { UpcomingMatchStatsCard } from '../UpcomingMatchStatsCard'
import { formatTime } from '../../utils/formatDate'

interface Props {
	match: IMatchResponse | IPreMatchResponse
}

export const UpcominMatchCard = ({ match }: Props): JSX.Element => {
	const [displayStats, setDisplayStats] = useState(false)
	const countryHome = match.home.cc?.toUpperCase()
	const countryAway = match.away.cc?.toUpperCase()

	const date = formatTime(new Date(match.est_time))

	return (
		<>
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
						<p>{date}</p>
						<p>{match.court?.name}</p>
						<p>{match.api_id}</p>
					</div>
					<div className="flex gap-1 justify-self-start items-center">
					{countryAway !== undefined ? (
							<img
								className="h-7 w-7"
								src={flagsObject[countryAway].image}
								alt={`Flag from ${flagsObject[countryAway]}`}
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
			{displayStats && (
				<UpcomingMatchStatsCard match={match}></UpcomingMatchStatsCard>
			)}
		</>
	)
}
