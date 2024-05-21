import { Router } from 'express'
import { DishesController } from '../controllers/dishesController.js'

const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.post('/', dishesController.create)

export { dishesRoutes }
