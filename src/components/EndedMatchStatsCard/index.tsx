import type { IMatchResponse } from '../../types/axiosResponse'

import { ResultStat } from './ResultStats'

interface Props {
	match: IMatchResponse
    reverse?: boolean
}

export const EndedMatchStatsCard = ({ match, reverse }: Props): JSX.Element => {
	return (
		<>
			<section className="border-t pt-3">
				<ResultStat matchData={match} reverse={reverse}></ResultStat>
			</section>
		</>
	)
}
