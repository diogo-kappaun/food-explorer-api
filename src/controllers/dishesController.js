import { dbConnection } from '../database/knex/index.js'

const knex = dbConnection

export class DishesController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body

    const [disheId] = await knex('dishes').insert({
      name,
      description,
      price_in_cents: price,
      category,
    })

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dishe_id: disheId,
        name,
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    return response.json('Prato cadastrado com sucesso!')
  }

  async update(request, response) {
    const { name, description, price, category, newIngredients } = request.body
    const { id } = request.query

    const dishe = await knex('dishes').where({ id }).first()

    dishe.name = name || dishe.name
    dishe.description = description || dishe.description
    dishe.price = price || dishe.price
    dishe.category = category || dishe.category

    if (newIngredients) {
      const ingredientsList = await knex('ingredients')
        .select('name')
        .where({ dishe_id: id })

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
          dishe_id: dishe.id,
          name: ingredient,
        })
      })

      ingredientsToRemove.forEach(async (ingredient) => {
        await knex('ingredients')
          .where({ name: ingredient, dishe_id: dishe.id })
          .delete()
      })
    }

    await knex('dishes')
      .update({
        name: dishe.name,
        description: dishe.description,
        price_in_cents: dishe.price,
        category: dishe.category,
      })
      .where({ id: dishe.id })

    return response.json('Prato atualizado com sucesso!')
  }

  async index(request, response) {
    /*
    const { name, ingredients, category } = request.query
    
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
          'dishes.image',
          'dishes.category',
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
          'dishes.image',
          'dishes.category',
        ])
        .whereLike('name', `%${name}%`)
        .orderBy('name')
    } else {
    } 
    */

    const dishes = await knex('dishes').select([
      'dishes.id',
      'dishes.name',
      'dishes.description',
      'dishes.price_in_cents',
      'dishes.image',
      'dishes.category',
    ])

    const ingredients = await knex('ingredients').select('name', 'dishe_id')
    const dishesWithIngredients = dishes.map((dish) => {
      const filteredIngredients = ingredients.filter(
        (ingredient) => ingredient.dishe_id === dish.id,
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

    await knex('dishes').where({ id }).delete()

    return response.json('Prato deletado com sucesso!')
  }
}
