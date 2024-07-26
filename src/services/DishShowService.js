export class DishShowService {
  constructor(dishRepository, favoriteRepository, ingredientRepository) {
    this.dishRepository = dishRepository
    this.favoriteRepository = favoriteRepository
    this.ingredientRepository = ingredientRepository
  }

  async execute({ user_id, dish_id }) {
    const dish = await this.dishRepository.getDishByID(dish_id)

    const dishIngredients =
      await this.ingredientRepository.getIngredientsByDishID(dish_id)

    const ingredients = dishIngredients.map((ingredient) => ingredient.name)

    const dishComplete = { ...dish, ingredients }

    return { dishComplete }
  }
}
