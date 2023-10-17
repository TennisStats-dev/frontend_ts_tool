import type { IPeriodStats } from '../../../types/types'

interface Props {
	columnName: string
	stats: IPeriodStats['onSurface']
}

export const ColumnMainStat = ({ columnName, stats }: Props): JSX.Element => {
	return (
		<div className="flex-col">
			<div className="flex justify-center gap-1">
				<p className="justify-self-center ">{columnName}</p>
			</div>
			<div className="flex justify-center gap-1 bg-primary-50 rounded-l">
				{stats !== 0 ? (
					<>
						<h2>{stats.victories.percentage}%</h2>
						<p className="text-xs/6">
							{stats.victories.total.length}/{stats.victories.sample.length}
						</p>
					</>
				) : (
					<h2>-</h2>
				)}
			</div>
			<div className="flex justify-center gap-1">
				<h2>{stats !== 0 ? stats.aces.average : '-'}</h2>
			</div>
			<div className="flex justify-center gap-1 bg-primary-50 rounded-l">
				<h2>{stats !== 0 ? stats.df.average : '-'}</h2>
			</div>
			<div className="flex justify-center gap-1">
				<h2>{stats !== 0 ? stats.games.average : '-'}</h2>
			</div>
		</div>
	)
}
