import { api } from '../API'
import surface_clay from '../assets/surface_clay.svg'
import surface_grass from '../assets/surface_grass.svg'
import surface_hard from '../assets/surface_hard.svg'
import { grounds } from './data'

export const tournamentSurfaceImage = {
	[grounds[api.constants.ground.clay].surface]: surface_clay,
	[grounds[api.constants.ground.grass].surface]: surface_grass,
	[grounds[api.constants.ground.hardOutdoor].surface]: surface_hard,
	[grounds[api.constants.ground.hardIndoor].surface]: surface_hard,
	[grounds[api.constants.ground.carpetOutdoor].surface]: surface_grass,
	[grounds[api.constants.ground.carpetIndoor].surface]: surface_grass,
	[grounds[api.constants.ground.syntheticOutdoor].surface]: surface_grass,
	[grounds[api.constants.ground.syntheticIndoor].surface]: surface_grass,
}

export const tournamentLocation = {
    [grounds[api.constants.ground.clay].location]: 'Outdoor',
	[grounds[api.constants.ground.grass].location]: 'Outdoor',
	[grounds[api.constants.ground.hardOutdoor].location]: 'Outdoor',
	[grounds[api.constants.ground.hardIndoor].location]: 'Indoor',
	[grounds[api.constants.ground.carpetOutdoor].location]: 'Outdoor',
	[grounds[api.constants.ground.carpetIndoor].location]: 'Indoor',
	[grounds[api.constants.ground.syntheticOutdoor].location]: 'Outdoor',
	[grounds[api.constants.ground.syntheticIndoor].location]: 'Indoor',
}
