import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.js'
import { AppError } from '../utils/AppError.js'

const { verify } = jwt

export function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers

  if (!authHeader.cookie) {
    throw new AppError('JWT Token inválido!', 401)
  }

  const [, token] = authHeader.split('token=')

  try {
    // eslint-disable-next-line camelcase
    const { sub: user_id, role } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id),
      role,
    }

    return next()
  } catch {
    throw new AppError('JWT Token inválido!', 401)
  }
}
