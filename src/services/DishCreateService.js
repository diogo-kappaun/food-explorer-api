export class DishCreateService {
  constructor(dishRepository, ingredientRepository) {
    this.dishRepository = dishRepository
    this.ingredientRepository = ingredientRepository
  }

  async execute({ name, description, price, ingredients }) {
    const dishId = await this.dishRepository.create({
      name,
      description,
      price,
    })

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id: dishId,
        name,
      }
    })

    await this.ingredientRepository.create(ingredientsInsert)
  }
}
