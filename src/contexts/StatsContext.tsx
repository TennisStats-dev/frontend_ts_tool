import {
	type SetStateAction,
	createContext,
	useState,
	type Dispatch,
} from 'react'
import type { IMatchPlayersStats } from '../types/types'

interface IStatsContextProps {
	matchesStats: IMatchPlayersStats[] | null
	setMatchesStats: Dispatch<SetStateAction<IMatchPlayersStats[] | null>>
}

const initialStatsContextState = {
	matchesStats: null,
	setMatchesStats: () => {},
}

export const StatsContext = createContext<IStatsContextProps>(
	initialStatsContextState,
)

interface Props {
	children: JSX.Element
}
export const MyStatsContextProvider = ({ children }: Props): JSX.Element => {
	const [matchesStats, setMatchesStats] =
		useState<IStatsContextProps['matchesStats']>(null)

	return (
		<StatsContext.Provider value={{ matchesStats, setMatchesStats }}>
			{children}
		</StatsContext.Provider>
	)
}
