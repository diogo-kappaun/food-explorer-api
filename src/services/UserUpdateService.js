import bcryptjs from 'bcryptjs'
import { AppError } from '../utils/AppError.js'
import { RegEx } from '../utils/RegEx.js'

const { hash, compare } = bcryptjs

export class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, currentPassword, newPassword, user_id }) {
    const user = await this.userRepository.findByID(user_id)

    if (!user) {
      throw new AppError('Usuário não encontrado!')
    }

    if (email) {
      const emailAlreadyInUse = await this.userRepository.findByEmail(email)

      if (emailAlreadyInUse && emailAlreadyInUse.id !== user_id) {
        throw new AppError(
          'O e-mail informado já está em uso. Por favor, use outro e-mail.',
        )
      }
    }

    if (!currentPassword && newPassword) {
      throw new AppError('Por favor, informe a senha atual.')
    }

    const validateRegEx = new RegEx(name, email, newPassword)

    if (currentPassword && newPassword) {
      const checksCurrentPasswordIsValid = await compare(
        currentPassword,
        user.password,
      )

      if (!checksCurrentPasswordIsValid) {
        throw new AppError('A senha atual informada não é válida.')
      }

      const hashedNewPassword = await hash(newPassword, 8)

      user.password = hashedNewPassword || user.password
    }

    user.email = email || user.email
    user.name = name || user.name

    await this.userRepository.update(user, user_id)
  }
}
