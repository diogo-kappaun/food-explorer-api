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

    response.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 15 * 60 * 1000,
    })

    delete user.password

    return response.json({ user })
  }
}
