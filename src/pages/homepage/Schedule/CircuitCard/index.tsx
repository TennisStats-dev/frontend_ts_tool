import { useState } from 'react'
import type { ITournamentsGroupedByCircuit } from '../../../../types/types'
import { TournamentCard } from '../TournamentCard'

interface Props {
	circuit: ITournamentsGroupedByCircuit
}

export const CircuitCard = ({ circuit }: Props): JSX.Element => {
	const [displayTournaments, setDisplayTournaments] = useState(true)

	return (
		<li
			key={circuit.name}
			className="border border-solid border-sky-500 rounded mb-2 p-2"
		>
			<article>
				<header className="flex justify-between items-center px-1">
					<div>
						<p>{circuit.name}</p>
					</div>
					<button
						onClick={() => {
							setDisplayTournaments(!displayTournaments)
						}}
					>
						<svg
							data-accordion-icon
							className={`w-3 h-3 shrink-0 ${
								displayTournaments ? 'rotate-180' : null
							}`}
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
				</header>
				<ul className={`${!displayTournaments ? 'hidden' : null}`}>
					{circuit.tournaments.map((tournament) => {
						return (
							<li key={tournament.id} className="mt-2">
								<TournamentCard tournament={tournament}></TournamentCard>
							</li>
						)
					})}
				</ul>
			</article>
		</li>
	)
}
