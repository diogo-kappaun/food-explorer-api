export class DishIndexService {
  constructor(dishRepository, ingredientRepository, favoriteRepository) {
    this.dishRepository = dishRepository
    this.ingredientRepository = ingredientRepository
    this.favoriteRepository = favoriteRepository
  }

  async execute() {
    const dishes = await this.dishRepository.getDishes()

    const AllIngredients = await this.ingredientRepository.getAllIngredients()

    const dishesWithIngredientsPromise = dishes.map(async (dish) => {
      const filteredIngredients = AllIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id,
      )
      const dishIngredients = filteredIngredients.map(
        (ingredient) => ingredient.name,
      )
      return {
        ...dish,
        ingredients: dishIngredients,
      }
    })

    const dishesWithIngredients = await Promise.all(
      dishesWithIngredientsPromise,
    )

    return dishesWithIngredients
  }
}
