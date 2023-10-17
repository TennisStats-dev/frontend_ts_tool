import { Header } from '../../components/Header'
import { MyStatsContextProvider } from '../../contexts/StatsContext'
import { formatDay } from '../../utils/formatDate'
import { Schedule } from './Schedule'

export const HomePage = (): JSX.Element => {
	console.log(formatDay(new Date()))
	return (
		<>
			<Header />
			<main className="pt-10">
				<MyStatsContextProvider>
					<Schedule></Schedule>
				</MyStatsContextProvider>
			</main>
		</>
	)
}
