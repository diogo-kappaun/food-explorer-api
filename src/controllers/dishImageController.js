import path from 'path'
import cloudinary from '../config/cloudinary.js'
import { dbConnection as knex } from '../database/knex/index.js'
import diskStorage from '../providers/DiskStorage.js'
import { AppError } from '../utils/AppError.js'

export class DishImageController {
  async update(request, response) {
    const dishId = request.query.id

    const imageFilename = request.file.filename

    const dish = await knex('dishes').where({ id: dishId }).first()

    if (!dish) {
      throw new AppError('Prato não encontrado!')
    }

    if (dish.image_id) {
      try {
        await cloudinary.uploader.destroy(dish.image_id)
      } catch (error) {
        throw new AppError('Não foi possível apagar a imagem!')
      }
    }

    try {
      const image = path.resolve('tmp', imageFilename)

      const { public_id } = await cloudinary.uploader.upload(image)

      await diskStorage.deleteFile(image)

      dish.image_id = public_id

      await knex('dishes').update(dish).where({ id: dishId })
    } catch (error) {
      throw new AppError(error)
    }

    return response.json('Imagem atualizada com sucesso!')
  }
}
