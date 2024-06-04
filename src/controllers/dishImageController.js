import { dbConnection } from '../database/knex/index.js'
import { DiskStorage } from '../providers/DiskStorage.js'
import { AppError } from '../utils/AppError.js'

const knex = dbConnection

const diskStorage = new DiskStorage()

export class DishImageController {
  async update(request, response) {
    const dishId = request.query.id

    const dishFilename = request.file.filename

    const dish = await knex('dishes').where({ id: dishId }).first()

    if (!dish) {
      throw new AppError('Prato não encontrado!')
    }

    if (dish.image) {
      await diskStorage.deleteFile(dish.image)
    }

    const filename = await diskStorage.saveFile(dishFilename)

    dish.image = filename

    await knex('dishes').update(dish).where({ id: dishId })

    return response.json({ dish })
  }
}
