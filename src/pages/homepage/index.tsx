import { Header } from '../../components/Header'
import { MyStatsContextProvider } from '../../contexts/StatsContext'
import { Schedule } from './Schedule'

export const HomePage = (): JSX.Element => {
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
