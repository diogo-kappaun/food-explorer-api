import { dbConnection as knex } from '../database/knex/index.js'
import { DishRepository } from '../repositories/DishRepository.js'
import { FavoriteRepository } from '../repositories/FavoriteRepository.js'
import { IngredientRepository } from '../repositories/IngredientRepository.js'
import { DishCreateService } from '../services/DishCreateService.js'
import { DishIndexService } from '../services/DishIndexService.js'
import { DishUpdateService } from '../services/DishUpdateService.js'
import { AppError } from '../utils/AppError.js'

const dishRepository = new DishRepository()
const ingredientRepository = new IngredientRepository()
const favoriteRepository = new FavoriteRepository()

export class DishesController {
  async create(request, response) {
    const { name, description, price, ingredients } = request.body

    const dishCreateService = new DishCreateService(
      dishRepository,
      ingredientRepository,
    )
    await dishCreateService.execute({ name, description, price, ingredients })

    return response.json('Prato cadastrado com sucesso!')
  }

  async update(request, response) {
    const { name, description, price, newIngredients } = request.body
    const { id } = request.query

    const dishUpdateService = new DishUpdateService(
      dishRepository,
      ingredientRepository,
    )
    await dishUpdateService.execute({
      name,
      description,
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

    const dish = await knex('dishes').where({ id }).first()

    const isFavorite = !!(await knex('favorites')
      .where({ user_id, dish_id: id })
      .first())

    return response.json({ dish, isFavorite })
  }

  async delete(request, response) {
    const { id } = request.query

    console.log(id)

    if (id === '') {
      throw new AppError('Prato não informado!')
    }

    await knex('dishes').where({ id }).delete()

    return response.json('Prato deletado com sucesso!')
  }
}
