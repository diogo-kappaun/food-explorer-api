import { FavoriteRepository } from '../repositories/FavoriteRepository.js'
import { FavoriteCreateService } from '../services/FavoriteCreateService.js'
import { FavoriteDeleteService } from '../services/FavoriteDeleteService.js'

const favoriteRepository = new FavoriteRepository()

export class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.query

    const favoriteCreateService = new FavoriteCreateService(favoriteRepository)
    await favoriteCreateService.execute({ user_id, dish_id })

    return response.json('Prato favoritado!')
  }

  async index(request, response) {
    const user_id = request.user.id

    const favorites = await favoriteRepository.getUserFavorites({ user_id })

    return response.json({ favorites })
  }

  async delete(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.query

    const favoriteDeleteService = new FavoriteDeleteService(favoriteRepository)
    await favoriteDeleteService.execute({ user_id, dish_id })

    return response.json('Favorito removido!')
  }
}
