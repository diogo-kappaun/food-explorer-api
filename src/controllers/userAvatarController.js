import path from 'path'
import cloudinary from '../config/cloudinary.js'
import { dbConnection as knex } from '../database/knex/index.js'
import diskStorage from '../providers/DiskStorage.js'
import { AppError } from '../utils/AppError.js'

export class UserAvatarController {
  async update(request, response) {
    const userId = request.user.id

    const avatarFilename = request.file.filename

    const user = await knex('users').where({ id: userId }).first()

    if (!user) {
      throw new AppError('Usuário não autenticado!', 401)
    }

    if (user.avatar_id) {
      try {
        await cloudinary.uploader.destroy(user.avatar_id)
      } catch {
        throw new AppError('Não foi possivel apagar a imagem!')
      }
    }

    try {
      const image = path.resolve('tmp', avatarFilename)

      const { public_id } = await cloudinary.uploader.upload(image)

      await diskStorage.deleteFile(image)

      user.avatar_id = public_id

      await knex('users').update(user).where({ id: userId })
    } catch (error) {
      throw new AppError('Não foi possivel carregar a imagem')
    }

    return response.json({ user })
  }
}
