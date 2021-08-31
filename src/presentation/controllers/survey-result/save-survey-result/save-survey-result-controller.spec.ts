import { HttpRequest } from '@/presentation/protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'
import {
  LoadSurveyById,
  SaveSurveyResult,
  SaveSurveyResultModel,
  SurveyModel,
  SurveyResultModel
} from './save-survey-result-controller-protocols'

type SutTypes = {
  sut: SaveSurveyResultController
  saveSurveyResultStub: SaveSurveyResult
  loadSurveyByIdStub: LoadSurveyById
}

const makeFakeSaveSurveyResult = (): SaveSurveyResultModel => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => ({
  ...makeFakeSaveSurveyResult(),
  id: 'any_id'
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  date: new Date()
})

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id'
  }
})

const makeSaveSurveyResultStub = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeFakeSurveyResult()
    }
  }

  return new SaveSurveyResultStub()
}

const makeLoadSurveyByIdStub = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return makeFakeSurvey()
    }
  }

  return new LoadSurveyByIdStub()
}

const makeSut = (): SutTypes => {
  const saveSurveyResultStub = makeSaveSurveyResultStub()
  const loadSurveyByIdStub = makeLoadSurveyByIdStub()
  const sut = new SaveSurveyResultController(
    saveSurveyResultStub,
    loadSurveyByIdStub
  )

  return { sut, saveSurveyResultStub, loadSurveyByIdStub }
}

describe('SaveSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')

    await sut.handle(makeFakeRequest())

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  //   test('Should return 403 if LoadSurveyById returns null', async () => {
  //     const { sut, loadSurveyByIdStub } = makeSut()
  //     jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)

  //     const httpResponse = await sut.handle(makeFakeRequest())

//     expect(httpResponse).toEqual(forbidden(new Error()))
//   })
})
