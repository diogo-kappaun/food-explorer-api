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

  async getDishesByName(name) {
    const dishes = await knex('dishes')
      .select([
        'dishes.id',
        'dishes.name',
        'dishes.description',
        'dishes.price_in_cents',
        'dishes.image_id',
      ])
      .whereLike('dishes.name', `%${name}%`)
      .orderBy('dishes.name')

    return dishes
  }

  async getDishes() {
    const dishes = await knex('dishes').select([
      'dishes.id',
      'dishes.name',
      'dishes.description',
      'dishes.price_in_cents',
      'dishes.image_id',
    ])

    return dishes
  }
}
