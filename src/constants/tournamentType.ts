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
