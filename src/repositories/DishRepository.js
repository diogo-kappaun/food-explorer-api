import { dbConnection as knex } from '../database/knex/index.js'

export class DishRepository {
  async create({ name, description, category, price }) {
    const [dish_id] = await knex('dishes').insert({
      name,
      description,
      category,
      price,
    })

    return dish_id
  }

  async getDishByID(id) {
    const dish = await knex('dishes').where({ id }).first()

    return dish
  }

  async dishUpdate({ name, description, category, price, id }) {
    await knex('dishes')
      .update({
        name,
        description,
        category,
        price,
      })
      .where({ id })
  }

  async getDishesByName(name) {
    const dishes = await knex('dishes')
      .select([
        'dishes.id',
        'dishes.name',
        'dishes.description',
        'dishes.category',
        'dishes.price',
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
      'dishes.category',
      'dishes.price',
      'dishes.image_id',
    ])

    return dishes
  }

  async delete(id) {
    await knex('dishes').where({ id }).delete()
  }

  async updateAll({ dish, id }) {
    await knex('dishes').update(dish).where({ id })
  }
}
