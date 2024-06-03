import { AppError } from '../utils/AppError.js'

export function verifyUserAuthorization(rolesToVerify) {
  return (request, response, next) => {
    const { role } = request.user

    if (!rolesToVerify.includes(role)) {
      throw new AppError('Usuário não autorizado!')
    }

    return next()
  }
}
