import { Header } from '../../components/Header'
import { Schedule } from './Schedule'

export const HomePage = (): JSX.Element => {
	return (
		<>
			<Header />
			<main className='pt-10'>
				<Schedule></Schedule>
			</main>
		</>
	)
}
