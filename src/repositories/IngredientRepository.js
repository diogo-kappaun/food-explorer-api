import { dbConnection as knex } from '../database/knex/index.js'

export class IngredientRepository {
  async create(ingredientsInsert) {
    await knex('ingredients').insert(ingredientsInsert)
  }
}
