import { Header } from '../../components/Header'
import { Schedule } from '../../components/Schedule'

export const HomePage = (): JSX.Element => {
	console.log('se renderiza la homepage')
	return (
		<>
			<Header />
			<Schedule></Schedule>
		</>
	)
}
