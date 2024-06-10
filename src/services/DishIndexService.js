export class DishIndexService {
  constructor(dishRepository, ingredientRepository, favoriteRepository) {
    this.dishRepository = dishRepository
    this.ingredientRepository = ingredientRepository
    this.favoriteRepository = favoriteRepository
  }

  async execute({ ingredients, name, user_id }) {
    let dishes

    if (ingredients) {
      const filterIngredients = ingredients
        .split(',')
        .map((ingredient) => ingredient.trim())

      dishes = await this.ingredientRepository.getDishesByIngredients({
        filterIngredients,
        name,
      })
    } else if (name) {
      dishes = await this.dishRepository.getDishesByName(name)
    } else {
      dishes = await this.dishRepository.getDishes()
    }

    const AllIngredients = await this.ingredientRepository.getAllIngredients()

    const dishesWithIngredientsPromise = dishes.map(async (dish) => {
      const isFavorite = await this.favoriteRepository.isFavorite({
        user_id,
        dish_id: dish.id,
      })

      const filteredIngredients = AllIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id,
      )
      const dishIngredients = filteredIngredients.map(
        (ingredient) => ingredient.name,
      )
      return {
        ...dish,
        ingredients: dishIngredients,
        isFavorite,
      }
    })

    const dishesWithIngredients = await Promise.all(
      dishesWithIngredientsPromise,
    )

    return dishesWithIngredients
  }
}
