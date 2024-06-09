import { UserRepository } from '../repositories/UserRepository.js'
import { UserAvatarService } from '../services/UserAvatarService.js'

const userRepository = new UserRepository()

export class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const avatarFilename = request.file.filename

    const userAvatarService = new UserAvatarService(userRepository)
    await userAvatarService.execute({ user_id, avatarFilename })

    return response.json('Imagem de perfil atualizada com sucesso!')
  }
}
