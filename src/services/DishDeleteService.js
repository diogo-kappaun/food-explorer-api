import { AppError } from '../utils/AppError.js'

export class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute(id) {
    if (id === '') {
      throw new AppError('Prato não informado!')
    }

    await this.dishRepository.delete(id)
  }
}
