import type { IMatchResponse } from '../../../types/axiosResponse'

interface Props {
	columnName: string
	matchStats: IMatchResponse['match_stats']
	player: 0 | 1
}

export const ColumnResultStat = ({
	columnName,
	matchStats,
	player,
}: Props): JSX.Element => {
	const totalGames =
		typeof matchStats.result !== 'string'
			? matchStats.result
					.map((match) =>
						match
							.split('-')
							.map((games) => Number(games))
							.reduce(
								(totalsetGames, playerSetGames) => totalsetGames + playerSetGames,
							),
					)
					.reduce((totalMatchGames, setGames) => totalMatchGames + setGames)
			: '-'

	return (
		<div className="flex-col">
			<div className="flex justify-center gap-1">
				<p className="justify-self-center ">{columnName}</p>
			</div>
			<div className="flex justify-center gap-1 bg-primary-50 rounded-l">
				{matchStats.win_1st_serve !== undefined ? (
					<h2> {matchStats.win_1st_serve[player]} %</h2>
				) : (
					<h2>-</h2>
				)}
			</div>
			<div className="flex justify-center gap-1">
				<h2>{totalGames}</h2>
			</div>
			<div className="flex justify-center gap-1 bg-primary-50 rounded-l">
				<h2>{matchStats.aces !== undefined ? matchStats.aces[player] : '-'}</h2>
			</div>
			<div className="flex justify-center gap-1 ">
				<h2>{matchStats.df !== undefined ? matchStats.df[player] : '-'}</h2>
			</div>
		</div>
	)
}
