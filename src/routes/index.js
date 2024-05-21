import { Router } from 'express'

import { dishesRoutes } from './dishes.routes.js'
import { sessionsRoutes } from './sessions.routes.js'
import { usersRoutes } from './users.routes.js'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/dishes', dishesRoutes)

export { routes }
