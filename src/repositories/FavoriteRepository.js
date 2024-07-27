import { dbConnection as knex } from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'

export class FavoriteRepository {
  async findByUserAndDishID({ user_id, dish_id }) {
    const isFavorite = await knex('favorites')
      .where({ user_id, dish_id })
      .first()

    return isFavorite
  }

  async create({ user_id, dish_id }) {
    await knex('favorites')
      .insert({ user_id, dish_id })
      .catch((err) => {
        throw new AppError(err)
      })
  }

  async getUserFavorites({ user_id }) {
    const favorites = await knex('favorites')
      .select(
        'dishes.id',
        'dishes.image_id',
        'dishes.description',
        'dishes.name',
      )
      .where({ user_id })
      .innerJoin('dishes', 'dishes.id', 'favorites.dish_id')

    return favorites
  }

  async delete({ user_id, dish_id }) {
    await knex('favorites').where({ user_id, dish_id }).delete()
  }

  async isFavorite({ user_id, dish_id }) {
    const isFavorite = !!(await knex('favorites')
      .where({ dish_id, user_id })
      .first())

    return isFavorite
  }
}
