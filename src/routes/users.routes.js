import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload.js'
import { UserAvatarController } from '../controllers/userAvatarController.js'
import { UserController } from '../controllers/usersController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

const usersRoutes = Router()

const upload = multer(uploadConfig.MULTER)

const usersController = new UserController()
const userAvatarController = new UserAvatarController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
)

export { usersRoutes }
