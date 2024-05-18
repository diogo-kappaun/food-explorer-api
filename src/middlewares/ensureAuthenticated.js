import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.js'
import { AppError } from '../utils/AppError.js'

const { verify } = jwt

export function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token inválido!', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    // eslint-disable-next-line camelcase
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id),
    }

    return next()
  } catch {
    throw new AppError('JWT Token inválido!', 401)
  }
}
