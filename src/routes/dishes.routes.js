import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload.js'
import { DishImageController } from '../controllers/dishImageController.js'
import { DishesController } from '../controllers/dishesController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'
import { verifyUserAuthorization } from '../middlewares/verifyUserAuthorization.js'

const dishesController = new DishesController()
const dishImageController = new DishImageController()

const upload = multer(uploadConfig.MULTER)

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
dishesRoutes.patch(
  '/image',
  verifyUserAuthorization(['admin']),
  upload.single('image'),
  dishImageController.update,
)
dishesRoutes.get('/', dishesController.index)

export { dishesRoutes }
