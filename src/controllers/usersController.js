import { UserRepository } from '../repositories/UserRepository.js'
import { UserCreateService } from '../services/UserCreateService.js'
import { UserUpdateService } from '../services/UserUpdateService.js'

const userRepository = new UserRepository()

export class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userCreateService = new UserCreateService(userRepository)
    await userCreateService.execute({ name, email, password })

    return response.json('Usuário cadastrado com sucesso!')
  }

  async update(request, response) {
    const { name, email, currentPassword, newPassword } = request.body
    const user_id = request.user.id

    const userUpdateService = new UserUpdateService(userRepository)
    await userUpdateService.execute({
      name,
      email,
      currentPassword,
      newPassword,
      user_id,
    })

    return response.json('Usuário atualizado com sucesso!')
  }
}
