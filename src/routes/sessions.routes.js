import { Router } from 'express'
import { SessionsController } from '../controllers/sessionsController.js'

const sessionsController = new SessionsController()

const sessionsRoutes = Router()

sessionsRoutes.post('/', sessionsController.create)

export { sessionsRoutes }
