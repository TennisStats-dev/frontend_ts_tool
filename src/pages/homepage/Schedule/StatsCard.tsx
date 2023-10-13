// import { useEffect, useState } from 'react'
// import type { IMatch, IPreMatch } from '../../../types/databaseTypes'
// import { api } from '../../../API'
// import type { IMatchPlayersData } from '../../../types/types'
// import { sortByDate } from '../../../services/match/sortByDate'
// import { MatchCard } from './MatchCard'

// interface Props {
//     match: IMatch | IPreMatch
// }

// export const StatsCard = ({ match }: Props): JSX.Element => {
// 	const [matches, setMatches] = useState<IMatchPlayersData>()

// 	useEffect(() => {
// 		const playersData = async (): Promise<IMatchPlayersData> => {

// 		}

// 		playersData()
// 			.then((res) => {
// 				setMatches(res)
// 			})
// 			.catch((err) => {
// 				console.log(err)
// 			})
// 	}, [])

// 	return (
// 		<section>
// 			<div>
// 				{matches?.home.splice(0, 5).map((match, index) => {
// 					return (
// 						<MatchCard key={match.api_id} match={match} index={index}></MatchCard>
// 					)
// 				})}
// 			</div>
// 			<div>
// 				{matches?.away.splice(0, 5).map((match, index) => {
// 					return (
// 						<MatchCard key={match.api_id} match={match} index={index}></MatchCard>
// 					)
// 				})}
// 			</div>
// 		</section>
// 	)
// }
