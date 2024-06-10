import path from 'path'
import cloudinary from '../config/cloudinary.js'
import diskStorage from '../providers/DiskStorage.js'
import { AppError } from '../utils/AppError.js'

export class DishImageService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ dish_id, imageFilename }) {
    const dish = await this.dishRepository.getDishByID(dish_id)

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

      await this.dishRepository.updateAll({ dish, id: dish_id })
    } catch (error) {
      throw new AppError(error)
    }
  }
}
