export class FavoriteToggleService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ user_id, dish_id }) {
    const isFavorite = await this.favoriteRepository.findByUserAndDishID({
      user_id,
      dish_id,
    })

    isFavorite
      ? await this.favoriteRepository.delete({ user_id, dish_id })
      : await this.favoriteRepository.create({ user_id, dish_id })

    const favorites = await this.favoriteRepository.getUserFavorites({
      user_id,
    })

    return favorites
  }
}
