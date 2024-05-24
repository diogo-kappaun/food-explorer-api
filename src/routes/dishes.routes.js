import { Router } from 'express'
import { DishesController } from '../controllers/dishesController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', dishesController.create)
dishesRoutes.put('/', dishesController.update)
dishesRoutes.delete('/', dishesController.delete)
dishesRoutes.get('/', dishesController.index)

export { dishesRoutes }
