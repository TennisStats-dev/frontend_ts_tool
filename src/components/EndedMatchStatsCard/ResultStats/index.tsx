import type { IMatchResponse } from '../../../types/axiosResponse'
import { ColumnResultStat } from './ColumnResultStat'

interface Props {
	matchData: IMatchResponse
	reverse?: boolean
}

export const ResultStat = ({ matchData, reverse }: Props): JSX.Element => {
	let homePlayer: 0 | 1 = 0
	let awayPlayer: 0 | 1 = 1

	if (reverse === true) {
		homePlayer = 1
		awayPlayer = 0
	}
	return (
		<section className="grid grid-cols-3 mx-40">
			<ColumnResultStat
				columnName="Total"
				matchStats={matchData?.match_stats}
				player={homePlayer}
			></ColumnResultStat>
			<div className="border-x-4 rounded-lg">
				<div className="flex justify-center">
					<p>Stats</p>
				</div>
				<div className="flex justify-center  bg-primary-50">
					<p>% 1rs serve won</p>
				</div>
				<div className="flex justify-center">
					<p>Games</p>
				</div>
				<div className="flex justify-center bg-primary-50">
					<p>Aces</p>
				</div>
				<div className="flex justify-center">
					<p>DF</p>
				</div>
			</div>
			<ColumnResultStat
				columnName="Total"
				matchStats={matchData?.match_stats}
				player={awayPlayer}
			></ColumnResultStat>
		</section>
	)
}
