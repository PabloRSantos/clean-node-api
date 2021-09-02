import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository, mockLoadSurveyResultRepository } from './db-load-survey-result-protocols'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)

  return { sut, loadSurveyResultRepositoryStub }
}

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository with correct id', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()

    const saveSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')

    await sut.load('any_survey_id')

    expect(saveSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should throws if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(new Error(''))

    const promise = sut.load('any_survey_id')

    await expect(promise).rejects.toThrow()
  })
})
