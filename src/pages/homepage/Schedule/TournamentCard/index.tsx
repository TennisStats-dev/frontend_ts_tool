import { useState } from 'react'
import { flagsObject } from '../../../../constants/countries'
import {
	tournamentLocation,
	tournamentSurfaceImage,
} from '../../../../constants/tournamentSurface'
import {
	MenDoubleType,
	MenType,
	tournamentTypeImages,
} from '../../../../constants/tournamentType'
import type { IMatchesGroupedByTournamentAndDay } from '../../../../types/types'
import { UpcominMatchCard } from '../../../../components/MatchCards/UpcomingMatchCard'
import { EndedMatchCard } from '../../../../components/MatchCards/EndedMatchCard'
import type { IMatchResponse } from '../../../../types/axiosResponse'

interface Props {
	tournament: IMatchesGroupedByTournamentAndDay
}

export const TournamentCard = ({ tournament }: Props): JSX.Element => {
	const [displayMatches, setDisplayMatches] = useState(true)

	const country =
		tournament.groupedMatches[0].matches[0].tournament.cc?.toUpperCase()
	const surface =
		tournament.groupedMatches[0].matches[0].tournament.ground?.surface
	const location =
		tournament.groupedMatches[0].matches[0].tournament.ground?.location

	return (
		<article>
			<header
				className={`sticky top-14 flex justify-between bg-slate-400 ${
					displayMatches ? 'rounded-t' : 'rounded'
				}`}
			>
				<div className="flex gap-2 items-center px-3">
					{tournament.groupedMatches[0].matches[0].tournament.type === 'M' ? (
						<MenType></MenType>
					) : (
						<MenDoubleType></MenDoubleType>
					)}

					<img
						className="h-4"
						src={
							tournamentTypeImages[
								tournament.groupedMatches[0].matches[0].tournament.type
							]
						}
					></img>
					{country !== undefined && (
						<img
							className="h-7 w-7"
							src={flagsObject[country].image}
							alt={`Flag from ${flagsObject[country]}`}
						></img>
					)}
					<p>{tournament.groupedMatches[0].matches[0].tournament.name}</p>
				</div>
				<div className="flex gap-1">
					{surface !== undefined && location !== undefined && (
						<div className="flex items-center gap-2">
							<div className="flex items-center">
								<img className="h-3" src={tournamentSurfaceImage[surface]}></img>
								<div className="px-3 flex justify-center">
									<p>{tournamentLocation[location]}</p>
								</div>
							</div>
						</div>
					)}
					<div className="pr-3">
						<button
							onClick={() => {
								setDisplayMatches(!displayMatches)
							}}
						>
							<svg
								data-accordion-icon
								className={`w-3 h-3 shrink-0 ${displayMatches ? 'rotate-180' : null}`}
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
			</header>
			<main>
				<ul
					className={`${
						!displayMatches ? 'hidden' : 'border-x-2 border-b-2 rounded-b'
					}`}
				>
					{tournament.groupedMatches.map((tournamentDay) => {
						return (
							<li
								key={tournamentDay.day}
								className={'border-bg-slate-400'}
								// className={`${
								// 	index !== 0 ? 'border-t-2' : null
								// } border-bg-slate-400 p-2`}
							>
								<h1 className="sticky top-14 border-y-2 px-2 text-center">
									{tournamentDay.day}
								</h1>
								{tournamentDay.matches.map((match, index, array) => {
									return match.status === 3 ? (
										<li
											className={`px-2 ${
												index !== 0 && index < array.length ? 'border-t' : null
											}`}
										>
											<EndedMatchCard
												key={match.api_id}
												match={match as IMatchResponse}
											></EndedMatchCard>
										</li>
									) : (
										<li
											className={`px-2 ${
												index !== 0 && index < array.length ? 'border-t' : null
											}`}
										>
											<UpcominMatchCard
												key={match.api_id}
												match={match}
											></UpcominMatchCard>
										</li>
									)
								})}
							</li>
						)
					})}
				</ul>
			</main>
		</article>
	)
}
