import { dbConnection } from '../database/knex/index.js'
import { AppError } from '../utils/AppError.js'

const knex = dbConnection

export class DishesController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body

    const [dishId] = await knex('dishes').insert({
      name,
      description,
      price_in_cents: price,
      category,
    })

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id: dishId,
        name,
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    return response.json('Prato cadastrado com sucesso!')
  }

  async update(request, response) {
    const { name, description, price, category, newIngredients } = request.body
    const { id } = request.query

    const dish = await knex('dishes').where({ id }).first()

    dish.name = name || dish.name
    dish.description = description || dish.description
    dish.price = price || dish.price
    dish.category = category || dish.category

    if (newIngredients) {
      const ingredientsList = await knex('ingredients')
        .select('name')
        .where({ dish_id: id })

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
        await knex('ingredients').insert({
          dish_id: dish.id,
          name: ingredient,
        })
      })

      ingredientsToRemove.forEach(async (ingredient) => {
        await knex('ingredients')
          .where({ name: ingredient, dish_id: dish.id })
          .delete()
      })
    }

    await knex('dishes')
      .update({
        name: dish.name,
        description: dish.description,
        price_in_cents: dish.price,
        category: dish.category,
      })
      .where({ id: dish.id })

    return response.json('Prato atualizado com sucesso!')
  }

  async index(request, response) {
    const { name, ingredients } = request.query

    let dishes

    if (ingredients) {
      const filterIngredients = ingredients
        .split(',')
        .map((ingredient) => ingredient.trim())

      dishes = await knex('ingredients')
        .select([
          'dishes.id',
          'dishes.name',
          'dishes.description',
          'dishes.price_in_cents',
          'dishes.image_id',
        ])
        .whereLike('dishes.name', `%${name}%`)
        .whereIn('ingredients.name', filterIngredients)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dishe_id')
        .groupBy('dishes.name')
    } else if (name) {
      dishes = await knex('dishes')
        .select([
          'dishes.id',
          'dishes.name',
          'dishes.description',
          'dishes.price_in_cents',
          'dishes.image_id',
        ])
        .whereLike('dishes.name', `%${name}%`)
        .orderBy('dishes.name')
    } else {
      dishes = await knex('dishes').select([
        'dishes.id',
        'dishes.name',
        'dishes.description',
        'dishes.price_in_cents',
        'dishes.image_id',
      ])
    }

    const AllIngredients = await knex('ingredients')

    const dishesWithIngredients = dishes.map((dish) => {
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

    return response.json(dishesWithIngredients)
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
