import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/validations/protocols/email-validator'
import { RequiredFieldValidation, EmailValidation, ValidationComposite } from '@/validations/validators'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('@/validations/validators/validation-compose')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
