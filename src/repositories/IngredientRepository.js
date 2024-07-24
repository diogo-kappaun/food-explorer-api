import { dbConnection as knex } from '../database/knex/index.js'

export class IngredientRepository {
  async create(ingredientsInsert) {
    await knex('ingredients').insert(ingredientsInsert)
  }

  async getIngredientsByDishID(id) {
    const ingredientsList = await knex('ingredients')
      .select('name')
      .where({ dish_id: id })

    return ingredientsList
  }

  async addNewIngredients({ dish_id, name }) {
    await knex('ingredients').insert({
      dish_id,
      name,
    })
  }

  async deleteIngredients({ dish_id, name }) {
    await knex('ingredients').where({ dish_id, name }).delete()
  }

  async getDishesByIngredients({ filterIngredients, name = '' }) {
    const dishes = await knex('ingredients')
      .select([
        'dishes.id',
        'dishes.name',
        'dishes.description',
        'dishes.price',
        'dishes.image_id',
      ])
      .whereLike('dishes.name', `%${name}%`)
      .whereIn('ingredients.name', filterIngredients)
      .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
      .groupBy('dishes.id')

    return dishes
  }

  async getAllIngredients() {
    const AllIngredients = await knex('ingredients')

    return AllIngredients
  }
}
