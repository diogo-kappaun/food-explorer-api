import { Router } from 'express'
import { DishesController } from '../controllers/dishesController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'
import { verifyUserAuthorization } from '../middlewares/verifyUserAuthorization.js'

const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post(
  '/',
  verifyUserAuthorization(['admin']),
  dishesController.create,
)
dishesRoutes.put(
  '/',
  verifyUserAuthorization(['admin']),
  dishesController.update,
)
dishesRoutes.delete(
  '/',
  verifyUserAuthorization(['admin']),
  dishesController.delete,
)
dishesRoutes.get('/', dishesController.index)

export { dishesRoutes }
