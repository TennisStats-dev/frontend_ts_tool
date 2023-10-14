import { useEffect, useState } from 'react'
import type { IMatchPlayersStats } from '../../../types/types'
import {
	getH2H,
	getIsFixed,
	getPlayerStats,
} from '../../../services/stats/getPlayerStats'
import type {
	IMatchResponse,
	IPreMatchResponse,
} from '../../../types/axiosResponse'

interface Props {
	match: IMatchResponse | IPreMatchResponse
}

export const StatsCard = ({ match }: Props): JSX.Element => {
	const [matchData, setMatchData] = useState<IMatchPlayersStats>()

	useEffect(() => {
		const matchStats = async (): Promise<IMatchPlayersStats> => {
			const home = await getPlayerStats(match, match.home)
			const away = await getPlayerStats(match, match.away)
			const h2h = getH2H(home.careerStats.all.victories.sample, match.away)
			const isFixed = getIsFixed(match)

			return {
				home,
				away,
				h2h,
				isFixed,
			}
		}

		matchStats()
			.then((res) => {
				setMatchData(() => res)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	// return (
	// 	<section className='border-t pt-3'>
	// 		<div className="grid grid-cols-7 grid-rows-5 gap-2 ">
	// 			<p className="justify-self-center ">Career</p>
	// 			<p className="justify-self-center">Year</p>
	// 			<p className="justify-self-center">Tournament</p>
	// 			<p className="justify-self-center">Stats</p>
	// 			<p className="justify-self-center">Tournament</p>
	// 			<p className="justify-self-center">Year</p>
	// 			<p className="justify-self-center">Career</p>
	// 			{/* Victories */}
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.careerStats.onSurface.victories.percentage}%</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.careerStats.onSurface.victories.total.length}/
	// 					{matchData?.home.careerStats.onSurface.victories.sample.length}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.yearStats.onSurface.victories.percentage}%</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.yearStats.onSurface.victories.total.length}/
	// 					{matchData?.home.yearStats.onSurface.victories.sample.length}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center">
	// 				<p>{matchData?.home.tournamentStats.all.victories.total.length}</p>
	// 			</div>
	//             <div className="justify-self-center">
	// 				<p>Victories</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.careerStats.onSurface.victories.percentage}%</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.careerStats.onSurface.victories.total.length}/
	// 					{matchData?.away.careerStats.onSurface.victories.sample.length}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.yearStats.onSurface.victories.percentage}%</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.yearStats.onSurface.victories.total.length}/
	// 					{matchData?.away.yearStats.onSurface.victories.sample.length}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center">
	// 				<p>{matchData?.away.tournamentStats.all.victories.total.length}</p>
	// 			</div>
	// 			{/* Aces */}
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.careerStats.onSurface.aces.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.careerStats.onSurface.aces.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.yearStats.onSurface.aces.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.yearStats.onSurface.aces.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.tournamentStats.all.aces.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.tournamentStats.all.aces.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center">
	// 				<p>Aces</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.careerStats.onSurface.aces.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.careerStats.onSurface.aces.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.yearStats.onSurface.aces.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.yearStats.onSurface.aces.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.tournamentStats.all.aces.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.tournamentStats.all.aces.sample}
	// 				</p>
	// 			</div>
	//             {/* Double faults */}
	//             <div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.careerStats.onSurface.df.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.careerStats.onSurface.df.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.yearStats.onSurface.df.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.yearStats.onSurface.df.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.tournamentStats.all.df.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.tournamentStats.all.df.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center">
	// 				<p>DF</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.careerStats.onSurface.df.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.careerStats.onSurface.df.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.yearStats.onSurface.df.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.yearStats.onSurface.df.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.tournamentStats.all.df.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.tournamentStats.all.df.sample}
	// 				</p>
	// 			</div>
	//             {/* Match total games */}
	//             <div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.careerStats.onSurface.games.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.careerStats.onSurface.games.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.yearStats.onSurface.games.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.yearStats.onSurface.games.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.home.tournamentStats.all.games.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.home.tournamentStats.all.games.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center">
	// 				<p className='text-center'>Total games</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.careerStats.onSurface.games.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.careerStats.onSurface.games.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.yearStats.onSurface.games.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.yearStats.onSurface.games.sample}
	// 				</p>
	// 			</div>
	// 			<div className="justify-self-center flex gap-1">
	// 				<h2>{matchData?.away.tournamentStats.all.games.average}</h2>
	// 				<p className="text-xs/6">
	// 					{matchData?.away.tournamentStats.all.games.sample}
	// 				</p>
	// 			</div>
	// 		</div>
	// 	</section>
	// )

	return (
		<section className="border-t pt-3">
			<div className="grid grid-cols-7">
				<div className="flex-col">
					<div className="flex justify-center gap-1">
						<p className="justify-self-center ">Career</p>
					</div>
					<div className="flex justify-center gap-1 bg-primary-50 rounded-l">
						<h2>{matchData?.home.careerStats.onSurface.victories.percentage}%</h2>
						<p className="text-xs/6">
							{matchData?.home.careerStats.onSurface.victories.total.length}/
							{matchData?.home.careerStats.onSurface.victories.sample.length}
						</p>
					</div>
					<div className="flex justify-center gap-1">
						<h2>{matchData?.home.careerStats.onSurface.aces.average}</h2>
					</div>
					<div className="flex justify-center gap-1 bg-primary-50 rounded-l">
						<h2>{matchData?.home.careerStats.onSurface.df.average}</h2>
					</div>
					<div className="flex justify-center gap-1">
						<h2>{matchData?.home.careerStats.onSurface.games.average}</h2>
					</div>
				</div>
				<div className="border-l">
					<div className="flex justify-center gap-1">
						<p className="justify-self-center ">Year</p>
					</div>
					<div className="flex justify-center gap-1 bg-primary-50">
						<h2>{matchData?.home.yearStats.onSurface.victories.percentage}%</h2>
						<p className="text-xs/6">
							{matchData?.home.yearStats.onSurface.victories.total.length}/
							{matchData?.home.yearStats.onSurface.victories.sample.length}
						</p>
					</div>
					<div className="flex justify-center">
						<h2>{matchData?.home.yearStats.onSurface.aces.average}</h2>
						<p className="text-xs/6"></p>
					</div>
					<div className="flex justify-center bg-primary-50">
						<h2>{matchData?.home.yearStats.onSurface.df.average}</h2>
						<p className="text-xs/6"></p>
					</div>
					<div className="flex justify-center">
						<h2>{matchData?.home.yearStats.onSurface.games.average}</h2>
						<p className="text-xs/6"></p>
					</div>
				</div>
				<div className="border-l">
					<div className="flex justify-center">
						<p className="justify-self-center ">Tournament</p>
					</div>
					<div className="flex justify-center bg-primary-50">
						<p>{matchData?.home.tournamentStats.all.victories.total.length}</p>
					</div>
					<div className="flex justify-center">
						<h2>{matchData?.home.tournamentStats.all.aces.average}</h2>
						<p className="text-xs/6"></p>
					</div>
					<div className="flex justify-center bg-primary-50">
						<h2>{matchData?.home.tournamentStats.all.df.average}</h2>
						<p className="text-xs/6"></p>
					</div>
					<div className="flex justify-center">
						<h2>{matchData?.home.tournamentStats.all.games.average}</h2>
						<p className="text-xs/6"></p>
					</div>
				</div>
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
				<div className="border-r">
					<div className="flex justify-center ">
						<p className="justify-self-center ">Tournament</p>
					</div>
					<div className="flex justify-center bg-primary-50">
						<p>{matchData?.away.tournamentStats.all.victories.total.length}</p>
					</div>
					<div className="flex justify-center">
						<h2>{matchData?.away.tournamentStats.all.aces.average}</h2>
						<p className="text-xs/6"></p>
					</div>
					<div className="flex justify-center bg-primary-50">
						<h2>{matchData?.away.tournamentStats.all.df.average}</h2>
						<p className="text-xs/6"></p>
					</div>
					<div className="flex justify-center">
						<h2>{matchData?.away.tournamentStats.all.games.average}</h2>
						<p className="text-xs/6"></p>
					</div>
				</div>
				<div className="border-r">
					<div className="flex justify-center ">
						<p className="justify-self-center ">Year</p>
					</div>
					<div className="flex justify-center gap-1 bg-primary-50">
						<h2>{matchData?.away.yearStats.onSurface.victories.percentage}%</h2>
						<p className="text-xs/6">
							{matchData?.away.yearStats.onSurface.victories.total.length}/
							{matchData?.away.yearStats.onSurface.victories.sample.length}
						</p>
					</div>
					<div className="flex justify-center">
						<h2>{matchData?.away.yearStats.onSurface.aces.average}</h2>
						<p className="text-xs/6"></p>
					</div>
					<div className="flex justify-center bg-primary-50">
						<h2>{matchData?.away.yearStats.onSurface.df.average}</h2>
						<p className="text-xs/6"></p>
					</div>
					<div className="flex justify-center">
						<h2>{matchData?.away.yearStats.onSurface.games.average}</h2>
						<p className="text-xs/6"></p>
					</div>
				</div>
				<div>
					<div className="flex justify-center">
						<p className="justify-self-center ">Career</p>
					</div>
					<div className="flex justify-center gap-1 bg-primary-50 rounded-r">
						<h2>{matchData?.away.careerStats.onSurface.victories.percentage}%</h2>
						<p className="text-xs/6">
							{matchData?.away.careerStats.onSurface.victories.total.length}/
							{matchData?.away.careerStats.onSurface.victories.sample.length}
						</p>
					</div>
					<div className="flex justify-center">
						<h2>{matchData?.away.careerStats.onSurface.aces.average}</h2>
						<p className="text-xs/6"></p>
					</div>
					<div className="flex justify-center bg-primary-50 rounded-r">
						<h2>{matchData?.away.careerStats.onSurface.df.average}</h2>
						<p className="text-xs/6"></p>
					</div>
					<div className="flex justify-center">
						<h2>{matchData?.away.careerStats.onSurface.games.average}</h2>
						<p className="text-xs/6"></p>
					</div>
				</div>
			</div>
		</section>
	)
}
