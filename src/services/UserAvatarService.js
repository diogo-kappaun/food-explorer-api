import path from 'path'
import cloudinary from '../config/cloudinary.js'
import diskStorage from '../providers/DiskStorage.js'
import { AppError } from '../utils/AppError.js'

export class UserAvatarService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ user_id, avatarFilename }) {
    const user = await this.userRepository.findByID(user_id)

    if (!user) {
      throw new AppError('Usuário não autenticado!', 401)
    }

    if (user.avatar_id) {
      try {
        await cloudinary.uploader.destroy(user.avatar_id)
      } catch {
        throw new AppError('Não foi possível apagar a imagem!')
      }
    }

    try {
      const image = path.resolve('tmp', avatarFilename)

      const { public_id } = await cloudinary.uploader.upload(image)

      await diskStorage.deleteFile(image)

      user.avatar_id = public_id

      await this.userRepository.updateAll(user, user_id)
    } catch (error) {
      throw new AppError('Não foi possível carregar a imagem!')
    }
  }
}
