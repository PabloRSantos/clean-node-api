import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyByIdRepository, LoadSurveyResultRepository, mockLoadSurveyResultRepository, mockSurveyResultModel } from './db-load-survey-result-protocols'
import MockData from 'mockdate'
import { mockLoadSurveyByIdRepository } from '@/data/tests'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)

  return { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub }
}

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockData.set(new Date())
  })

  afterAll(() => {
    MockData.reset()
  })

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

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockResolvedValueOnce(null)
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')

    await sut.load('any_survey_id')

    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return SurveyResultModel on success', async () => {
    const { sut } = makeSut()

    const surveyResult = await sut.load('any_survey_id')

    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
