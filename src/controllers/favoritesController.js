import { FavoriteRepository } from '../repositories/FavoriteRepository.js'
import { FavoriteToggleService } from '../services/FavoriteToggleService.js'

const favoriteRepository = new FavoriteRepository()

export class FavoritesController {
  async toggle(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.query

    const favoriteToggleService = new FavoriteToggleService(favoriteRepository)
    const favorites = await favoriteToggleService.execute({ user_id, dish_id })

    return response.json(favorites)
  }

  async index(request, response) {
    const user_id = request.user.id

    const favorites = await favoriteRepository.getUserFavorites({ user_id })

    return response.json({ favorites })
  }
}
