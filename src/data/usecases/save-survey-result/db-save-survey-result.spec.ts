import MockData from 'mockdate'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from './db-save-survey-result-protocols'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSaveSurveyResultRepositoryStub = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeFakeSurveyResult()
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositoryStub()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

  return { sut, saveSurveyResultRepositoryStub }
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

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockData.set(new Date())
  })

  afterAll(() => {
    MockData.reset()
  })

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')

    await sut.save(makeFakeSaveSurveyResult())

    expect(saveSpy).toHaveBeenCalledWith(makeFakeSaveSurveyResult())
  })

  //   test('Should throws if AddSurveyRepository throws', async () => {
  //     const { sut, addSurveyRepositoryStub } = makeSut()
  //     jest.spyOn(addSurveyRepositoryStub, 'add').mockRejectedValueOnce(new Error(''))

  //     const promise = sut.add(makeFakeSurveyData())

//     await expect(promise).rejects.toThrow()
//   })
})
