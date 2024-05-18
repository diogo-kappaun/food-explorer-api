import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.js'
import { dbConnection } from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'

const { compare } = bcryptjs
const { sign } = jwt

const knex = dbConnection

export class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }

    const checkPassword = await compare(password, user.password)

    if (!checkPassword) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    delete user.password

    return response.json({ user, token })
  }
}
