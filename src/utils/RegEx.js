import { AppError } from './AppError.js'

export class RegEx {
  constructor(name, email, password) {
    if (name) this.validateNameInput(name)
    if (email) this.validateEmailInput(email)
    if (password) this.validatePasswordInput(password)
  }

  regexName = /^[a-zA-ZÀ-ÿ' -]+$/

  regexEmail = /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}$/i

  regexPassword =
    /^(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>?,./~`[\]\\-])(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,}$/

  validateNameInput(name) {
    const testedName = this.regexName.test(name)

    if (!testedName) {
      throw new AppError(
        'O nome informado é inválido! Por favor, verifique se contém apenas letras e caracteres permitidos e tente novamente.',
      )
    }
  }

  validateEmailInput(email) {
    const testedEmail = this.regexEmail.test(email)

    if (!testedEmail) {
      throw new AppError(
        'O e-mail informado é inválido! Certifique-se de que esteja escrito corretamente (por exemplo, exemplo@exemplo.com) e tente novamente.',
      )
    }
  }

  validatePasswordInput(password) {
    const testedPassword = this.regexPassword.test(password)

    if (!testedPassword) {
      throw new AppError(
        'A senha informada é inválida! Deve conter pelo menos uma letra minúscula, maiúscula, um dígito (0-9) e caracteres especiais (@$!%*?&), além de conter no mínimo 8+ caracteres!',
      )
    }
  }
}
