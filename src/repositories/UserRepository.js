import { dbConnection as knex } from '../database/knex/index.js'

export class UserRepository {
  async findByEmail(email) {
    const user = await knex('users')
      .select('email', 'id')
      .where({ email })
      .first()

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

  async findByID(user_id) {
    const user = await knex('users').where({ id: user_id }).first()

    return user
  }

  async update(user, user_id) {
    await knex('users')
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now(),
      })
      .where({ id: user_id })
  }

  async updateAll(user, user_id) {
    await knex('users')
      .update({ avatar_id: user.avatar_id, updated_at: knex.fn.now() })
      .where({ id: user_id })
  }
}
