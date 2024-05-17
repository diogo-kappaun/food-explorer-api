import pkg from 'bcryptjs'
import { dbConnection } from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'

const { hash } = pkg

const knex = dbConnection

export class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
      throw new AppError('Todos os campos são obrigatórios.')
    }

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
}
