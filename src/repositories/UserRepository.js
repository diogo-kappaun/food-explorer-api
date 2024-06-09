import { dbConnection as knex } from '../database/knex/index.js'

export class UserRepository {
  async findByEmail(email) {
    const user = await knex('users').select('email').where({ email }).first()

    return user
  }

  async create({ name, email, password }) {
    const userId = await knex('users').insert({
      name,
      email,
      password,
    })

    return userId
  }
}
