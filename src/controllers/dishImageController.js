import { DishRepository } from '../repositories/DishRepository.js'
import { DishImageService } from '../services/DishImageService.js'

const dishRepository = new DishRepository()

export class DishImageController {
  async update(request, response) {
    const dish_id = request.query.id

    const imageFilename = request.file.filename

    const dishImageService = new DishImageService(dishRepository)
    await dishImageService.execute({ dish_id, imageFilename })

    return response.json('Imagem atualizada com sucesso!')
  }
}
