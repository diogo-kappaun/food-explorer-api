import { dbConnection as knex } from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'

export class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.query

    const isFavorite = await knex('favorites')
      .where({ user_id, dish_id })
      .first()

    if (isFavorite) {
      throw new AppError('Prato informado já está favoritado!')
    }

    await knex('favorites')
      .insert({ user_id, dish_id })
      .catch((err) => {
        throw new AppError(err)
      })

    return response.json('Prato favoritado!')
  }

  async index(request, response) {
    const user_id = request.user.id

    const favorites = await knex('favorites')
      .select('dishes.id', 'dishes.image_id', 'dishes.name')
      .where({ user_id })
      .innerJoin('dishes', 'dishes.id', 'favorites.dish_id')

    return response.json({ favorites })
  }

  async delete(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.query

    const isFavorite = await knex('favorites')
      .where({ user_id, dish_id })
      .first()

    if (!isFavorite) {
      throw new AppError('Prato informado não está favoritado!')
    }

    await knex('favorites').where({ user_id, dish_id }).delete()

    return response.json('Favorito removido!')
  }
}
