import { dbConnection } from '../database/knex/index.js'
import { DiskStorage } from '../providers/DiskStorage.js'
import { AppError } from '../utils/AppError.js'

const knex = dbConnection

const diskStorage = new DiskStorage()

export class UserAvatarController {
  async update(request, response) {
    const userId = request.user.id

    const avatarFilename = request.file.filename

    const user = await knex('users').where({ id: userId }).first()

    if (!user) {
      throw new AppError('Usuário não autenticado!', 401)
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)

    user.avatar = filename

    await knex('users').update(user).where({ id: userId })

    return response.json({ user })
  }
}
