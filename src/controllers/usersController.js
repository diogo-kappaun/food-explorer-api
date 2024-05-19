import bcryptjs from 'bcryptjs'
import { dbConnection } from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'
import { RegEx } from '../utils/RegEx.js'

const { hash, compare } = bcryptjs

const knex = dbConnection

export class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
      throw new AppError('Todos os campos são obrigatórios.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validateRegEx = new RegEx(name, email, password)

    const emailAlreadyInUse = await knex('users')
      .select('email')
      .where({ email })
      .first()

    if (emailAlreadyInUse) {
      throw new AppError('O E-mail informado já está registrado.')
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    })

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
        throw new AppError('E-mail informado está em uso!')
      }
    }

    if (!currentPassword && newPassword) {
      throw new AppError('Senha atual não informada!')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const validateRegEx = new RegEx(name, email, newPassword)

    if (currentPassword && newPassword) {
      const checksCurrentPasswordIsValid = await compare(
        currentPassword,
        user.password,
      )

      if (!checksCurrentPasswordIsValid) {
        throw new AppError('Senha atual informada não é valida!')
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
