export class DishUpdateService {
  constructor(dishRepository, ingredientRepository) {
    this.dishRepository = dishRepository
    this.ingredientRepository = ingredientRepository
  }

  async execute({ name, description, category, price, ingredients, id }) {
    const dish = await this.dishRepository.getDishByID(id)

    dish.name = name || dish.name
    dish.description = description || dish.description
    dish.category = category || dish.category
    dish.price = price || dish.price

    if (ingredients) {
      const ingredientsList =
        await this.ingredientRepository.getIngredientsByDishID(id)

      const dishIngredients = ingredientsList.map(
        (ingredient) => ingredient.name,
      )

      const ingredientsToAdd = ingredients.filter((ingredient) => {
        return !dishIngredients.includes(ingredient)
      })

      const ingredientsToRemove = dishIngredients.filter((ingredient) => {
        return !ingredients.includes(ingredient)
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
      category: dish.category,
      price: dish.price,
      id: dish.id,
    })
  }
}
