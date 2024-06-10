export class DishShowService {
  constructor(dishRepository, favoriteRepository) {
    this.dishRepository = dishRepository
    this.favoriteRepository = favoriteRepository
  }

  async execute({ user_id, dish_id }) {
    const dish = await this.dishRepository.getDishByID(dish_id)

    const isFavorite = await this.favoriteRepository.isFavorite({
      user_id,
      dish_id,
    })

    return { dish, isFavorite }
  }
}
