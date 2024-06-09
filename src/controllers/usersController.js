import bcryptjs from 'bcryptjs'
import { dbConnection as knex } from '../database/knex/index.js'
import { UserRepository } from '../repositories/UserRepository.js'
import { AppError } from '../utils/AppError.js'
import { RegEx } from '../utils/RegEx.js'

const { hash, compare } = bcryptjs

const userRepository = new UserRepository()

export class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
      throw new AppError(
        'Por favor, preencha todos os campos antes de prosseguir.',
      )
    }

    const validateRegEx = new RegEx(name, email, password)

    const emailAlreadyInUse = await userRepository.findByEmail(email)

    if (emailAlreadyInUse) {
      throw new AppError(
        'Este e-mail já está registrado. Por favor, utilize outro.',
      )
    }

    const hashedPassword = await hash(password, 8)

    await userRepository.create({ name, email, password: hashedPassword })

    return response.json(`Usuário cadastrado com sucesso!`)
  }

  async update(request, response) {
    const { name, email, currentPassword, newPassword } = request.body
    const userId = request.user.id

    const user = await knex('users').where({ id: userId }).first()

    if (!user) {
      throw new AppError('Usuário não encontrado!')
    }

    if (email) {
      const emailAlreadyInUse = await knex('users').where({ email }).first()

      if (emailAlreadyInUse && emailAlreadyInUse.id !== userId) {
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

    await knex('users')
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now(),
      })
      .where({ id: userId })

    return response.json('Usuário atualizado com sucesso!')
  }
}
