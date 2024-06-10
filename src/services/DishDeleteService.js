import cloudinary from '../config/cloudinary.js'
import { AppError } from '../utils/AppError.js'

export class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute(id) {
    if (id === '') {
      throw new AppError('Prato não informado!')
    }

    const dish = await this.dishRepository.getDishByID(id)

    if (dish.image_id) {
      try {
        await cloudinary.uploader.destroy(dish.image_id)
      } catch (error) {
        throw new AppError('Não foi possível apagar a imagem!')
      }
    }

    await this.dishRepository.delete(id)
  }
}
