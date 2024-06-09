import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.js'
import { AppError } from '../utils/AppError.js'

const { compare } = bcryptjs
const { sign } = jwt

export class SessionCreateService {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository
  }

  async execute({ email, password }) {
    const user = await this.sessionRepository.findByEmail(email)

    if (!user) {
      throw new AppError('E-mail e/ou senha incorreta!', 401)
    }

    const checkPassword = await compare(password, user.password)

    if (!checkPassword) {
      throw new AppError('E-mail e/ou senha incorreta!', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    })

    return { token, user }
  }
}
