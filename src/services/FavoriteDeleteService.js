import { AppError } from '../utils/AppError.js'

export class FavoriteDeleteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ user_id, dish_id }) {
    const isFavorite = await this.favoriteRepository.findByUserAndDishID({
      user_id,
      dish_id,
    })

    if (!isFavorite) {
      throw new AppError('Prato informado não está favoritado!')
    }

    await this.favoriteRepository.delete({ user_id, dish_id })
  }
}
