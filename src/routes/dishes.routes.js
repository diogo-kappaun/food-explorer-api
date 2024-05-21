import { Router } from 'express'
import { DishesController } from '../controllers/dishesController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.post('/', ensureAuthenticated, dishesController.create)
dishesRoutes.delete('/', ensureAuthenticated, dishesController.delete)

export { dishesRoutes }
