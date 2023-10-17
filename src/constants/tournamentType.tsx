import men from '../assets/men.svg'
import menDoubles from '../assets/menDoubles.svg'
import women from '../assets/women.svg'
import womenDoubles from '../assets/womenDoubles.svg'
import { type } from './data'

export const tournamentTypeImages = {
	[type.men]: men,
	[type.menDoubles]: menDoubles,
	[type.women]: women,
	[type.womenDoubles]: womenDoubles,
	[type.menMixed]: men + menDoubles,
	'M - MD': men + menDoubles,
}

export const MenType = (): JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-user"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			strokeWidth="3"
			stroke="#2f5491"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
			<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
		</svg>
	)
}

export const MenDoubleType = (): JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-users"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			strokeWidth="3"
			stroke="#2f5491"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
			<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
			<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
			<path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
		</svg>
	)
}
