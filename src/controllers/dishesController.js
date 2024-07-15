import { DishRepository } from '../repositories/DishRepository.js'
import { FavoriteRepository } from '../repositories/FavoriteRepository.js'
import { IngredientRepository } from '../repositories/IngredientRepository.js'

import { DishCreateService } from '../services/DishCreateService.js'
import { DishDeleteService } from '../services/DishDeleteService.js'
import { DishIndexService } from '../services/DishIndexService.js'
import { DishShowService } from '../services/DishShowService.js'
import { DishUpdateService } from '../services/DishUpdateService.js'

const dishRepository = new DishRepository()
const ingredientRepository = new IngredientRepository()
const favoriteRepository = new FavoriteRepository()

export class DishesController {
  async create(request, response) {
    const { name, description, category, price, ingredients } = request.body

    const dishCreateService = new DishCreateService(
      dishRepository,
      ingredientRepository,
    )
    const dishId = await dishCreateService.execute({
      name,
      description,
      category,
      price,
      ingredients,
    })

    return response.json(dishId)
  }

  async update(request, response) {
    const { name, description, category, price, newIngredients } = request.body
    const { id } = request.query

    const dishUpdateService = new DishUpdateService(
      dishRepository,
      ingredientRepository,
    )
    await dishUpdateService.execute({
      name,
      description,
      category,
      price,
      newIngredients,
      id,
    })

    return response.json('Prato atualizado com sucesso!')
  }

  async index(request, response) {
    const user_id = request.user.id
    const { name, ingredients } = request.query

    const dishIndexService = new DishIndexService(
      dishRepository,
      ingredientRepository,
      favoriteRepository,
    )
    const dishesWithIngredients = await dishIndexService.execute({
      ingredients,
      name,
      user_id,
    })

    return response.json(dishesWithIngredients)
  }

  async show(request, response) {
    const user_id = request.user.id
    const { id } = request.params

    const dishShowService = new DishShowService(
      dishRepository,
      favoriteRepository,
    )
    const { dish, isFavorite } = await dishShowService.execute({
      user_id,
      dish_id: id,
    })

    return response.json({ dish, isFavorite })
  }

  async delete(request, response) {
    const { id } = request.query

    const dishDeleteService = new DishDeleteService(dishRepository)
    await dishDeleteService.execute(id)

    return response.json('Prato deletado com sucesso!')
  }
}
