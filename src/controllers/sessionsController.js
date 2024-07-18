import { SessionRepository } from '../repositories/SessionRepository.js'
import { SessionCreateService } from '../services/SessionCreateService.js'

const sessionRepository = new SessionRepository()

export class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const sessionCreateService = new SessionCreateService(sessionRepository)
    const { user, token } = await sessionCreateService.execute({
      email,
      password,
    })

    delete user.id
    delete user.password
    delete user.role
    delete user.created_at
    delete user.updated_at

    return response.json({ user, token })
  }
}
