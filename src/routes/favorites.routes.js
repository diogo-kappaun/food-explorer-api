import { Router } from 'express'
import { FavoritesController } from '../controllers/favoritesController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

const favoritesRoutes = Router()

const favoritesController = new FavoritesController()

favoritesRoutes.post('/', ensureAuthenticated, favoritesController.toggle)
favoritesRoutes.get('/', ensureAuthenticated, favoritesController.index)

export { favoritesRoutes }
