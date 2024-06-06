import { Router } from 'express'
import { FavoritesController } from '../controllers/favoritesController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

const favoritesRoutes = Router()

const favoritesController = new FavoritesController()

favoritesRoutes.post('/', ensureAuthenticated, favoritesController.create)
favoritesRoutes.get('/', ensureAuthenticated, favoritesController.index)
favoritesRoutes.delete('/', ensureAuthenticated, favoritesController.delete)

export { favoritesRoutes }
