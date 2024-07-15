export class DishCreateService {
  constructor(dishRepository, ingredientRepository) {
    this.dishRepository = dishRepository
    this.ingredientRepository = ingredientRepository
  }

  async execute({ name, description, category, price, ingredients }) {
    const dishId = await this.dishRepository.create({
      name,
      description,
      category,
      price,
    })

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id: dishId,
        name,
      }
    })

    await this.ingredientRepository.create(ingredientsInsert)

    return dishId
  }
}
