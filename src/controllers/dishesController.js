import { dbConnection } from '../database/knex/index.js'

const knex = dbConnection

export class DishesController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body

    const [disheId] = await knex('dishes').insert({
      name,
      description,
      price_in_cents: price,
      category,
    })

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dishe_id: disheId,
        name,
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    return response.json('Prato cadastrado com sucesso!')
  }
}
