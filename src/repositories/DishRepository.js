import { dbConnection as knex } from '../database/knex/index.js'

export class DishRepository {
  async create({ name, description, price }) {
    const [dish_id] = await knex('dishes').insert({
      name,
      description,
      price_in_cents: price,
    })

    return dish_id
  }

  async getDishByID(id) {
    const dish = await knex('dishes').where({ id }).first()

    return dish
  }

  async dishUpdate({ name, description, price_in_cents, id }) {
    await knex('dishes')
      .update({
        name,
        description,
        price_in_cents,
      })
      .where({ id })
  }
}
