import type { IMatchPlayersStats } from '../../../types/types'
import { ColumnMainStat } from './ColumnMainStat'

interface Props {
	matchData: IMatchPlayersStats
}

export const MainStats = ({ matchData }: Props): JSX.Element => {
	return (
		<div className="grid grid-cols-7">
			<ColumnMainStat
				columnName="Career"
				stats={matchData?.home.careerStats.onSurface}
			></ColumnMainStat>
			<ColumnMainStat
				columnName="Year"
				stats={matchData?.home.yearStats.onSurface}
			></ColumnMainStat>
			<ColumnMainStat
				columnName="Tournament"
				stats={matchData?.home.tournamentStats.all}
			></ColumnMainStat>
			<div className="border-x-4 rounded-lg">
				<div className="flex justify-center">
					<p>Stats</p>
				</div>
				<div className="flex justify-center  bg-primary-50">
					<p>Victories</p>
				</div>
				<div className="flex justify-center">
					<p>Aces Avg</p>
				</div>
				<div className="flex justify-center bg-primary-50">
					<p>DF Avg</p>
				</div>
				<div className="flex justify-center">
					<p>games Avg</p>
				</div>
			</div>
			<ColumnMainStat
				columnName="Tournament"
				stats={matchData?.away.tournamentStats.all}
			></ColumnMainStat>
			<ColumnMainStat
				columnName="Year"
				stats={matchData?.away.yearStats.onSurface}
			></ColumnMainStat>
			<ColumnMainStat
				columnName="Career"
				stats={matchData?.away.careerStats.onSurface}
			></ColumnMainStat>
		</div>
	)
}
