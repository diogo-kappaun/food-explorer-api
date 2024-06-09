import { dbConnection as knex } from '../database/knex/index.js'

export class SessionRepository {
  async findByEmail(email) {
    const user = await knex('users').where({ email }).first()

    return user
  }
}
