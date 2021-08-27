import { AddSurvey, AddSurveyModel, badRequest, HttpRequest, serverError, Validation } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'

interface SutTypes {
  sut: AddSurveyController
  validationStub: Validation
  addSurveyStub: AddSurvey
}

const makeHttpRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answers: 'any_answer'
    }]
  }
})

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeAddSurveyStub = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyModel): Promise<void> {
      return Promise.resolve()
    }
  }

  return new AddSurveyStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addSurveyStub = makeAddSurveyStub()
  const sut = new AddSurveyController(validationStub, addSurveyStub)

  return { sut, validationStub, addSurveyStub }
}

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(makeHttpRequest())

    expect(validationSpy).toHaveBeenCalledWith(makeHttpRequest().body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error(''))

    const httpResponse = await sut.handle(makeHttpRequest())

    expect(httpResponse).toEqual(badRequest(new Error('')))
  })

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')

    await sut.handle(makeHttpRequest())

    expect(addSpy).toHaveBeenCalledWith(makeHttpRequest().body)
  })

  test('Should returns 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(makeHttpRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
