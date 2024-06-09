import bcryptjs from 'bcryptjs'
import { AppError } from '../utils/AppError.js'
import { RegEx } from '../utils/RegEx.js'

const { hash } = bcryptjs

export class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    if (!name || !email || !password) {
      throw new AppError(
        'Por favor, preencha todos os campos antes de prosseguir.',
      )
    }

    const validateRegEx = new RegEx(name, email, password)

    const emailAlreadyInUse = await this.userRepository.findByEmail(email)

    if (emailAlreadyInUse) {
      throw new AppError(
        'Este e-mail já está registrado. Por favor, utilize outro.',
      )
    }

    const hashedPassword = await hash(password, 8)

    await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })
  }
}
