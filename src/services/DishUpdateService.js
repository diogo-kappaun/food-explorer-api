export class DishUpdateService {
  constructor(dishRepository, ingredientRepository) {
    this.dishRepository = dishRepository
    this.ingredientRepository = ingredientRepository
  }

  async execute({ name, description, price, newIngredients, id }) {
    const dish = await this.dishRepository.getDishByID(id)

    dish.name = name || dish.name
    dish.description = description || dish.description
    dish.price = price || dish.price

    if (newIngredients) {
      const ingredientsList =
        await this.ingredientRepository.getIngredientsByDishID(id)

      const dishIngredients = ingredientsList.map(
        (ingredient) => ingredient.name,
      )

      const ingredientsToAdd = newIngredients.filter((ingredient) => {
        return !dishIngredients.includes(ingredient)
      })

      const ingredientsToRemove = dishIngredients.filter((ingredient) => {
        return !newIngredients.includes(ingredient)
      })

      ingredientsToAdd.forEach(async (ingredient) => {
        await this.ingredientRepository.addNewIngredients({
          dish_id: dish.id,
          name: ingredient,
        })
      })

      ingredientsToRemove.forEach(async (ingredient) => {
        await this.ingredientRepository.deleteIngredients({
          dish_id: dish.id,
          name: ingredient,
        })
      })
    }

    await this.dishRepository.dishUpdate({
      name: dish.name,
      description: dish.description,
      price_in_cents: dish.price,
      id: dish.id,
    })
  }
}
