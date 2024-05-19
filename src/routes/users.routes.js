import { Router } from 'express'
import { UserController } from '../controllers/usersController.js'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js'

const usersRoutes = Router()

const usersController = new UserController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)

export { usersRoutes }
