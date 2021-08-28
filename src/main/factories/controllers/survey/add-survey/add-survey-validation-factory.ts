import { ValidationComposite, RequiredFieldValidation } from '../../../../../validations/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['answers', 'question']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
