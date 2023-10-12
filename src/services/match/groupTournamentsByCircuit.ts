import type {
	IMatchesGroupedByTournament,
	ITournamentsGroupedByCircuit,
} from '../../types/types'

const circuitsOrder = [
	'ATP',
	'WTA',
	'Challenger',
	'ITF',
	'UTR',
	'Davis Cup',
	'Laver Cup',
	'UK Pro League',
	'More',
]

export const groupTournamentsByCircuit = (
	arrayInput: IMatchesGroupedByTournament[],
): ITournamentsGroupedByCircuit[] => {
	const groupedByCircuit = new Map<string, IMatchesGroupedByTournament[]>()

	for (const tournament of arrayInput) {
		const tournamentCircuit = tournament.matches[0].tournament.circuit

		if (tournamentCircuit !== undefined) {
			if (!groupedByCircuit.has(tournamentCircuit)) {
				groupedByCircuit.set(tournamentCircuit, [])
			}

			const circuit = groupedByCircuit.get(tournamentCircuit)

			if (circuit !== undefined) {
				circuit.push(tournament)
			}
		} else {
			if (!groupedByCircuit.has('More')) {
				groupedByCircuit.set('More', [])
			}
			const otherTournaments = groupedByCircuit.get('More')
			otherTournaments?.push(tournament)
		}
	}

	const groupedByCircuitArray = Array.from(groupedByCircuit, ([key, value]) => ({
		name: key,
		tournaments: value,
	}))

	const sortedCircuitsArray: ITournamentsGroupedByCircuit[] = []

	groupedByCircuitArray.forEach((circuit) => {
		const index = circuitsOrder.indexOf(circuit.name)

		sortedCircuitsArray[index] = circuit
	})

	const debuggedSortedCircuitsArray = sortedCircuitsArray.filter(
		(circuit) => circuit,
	)

	return debuggedSortedCircuitsArray
}
