import { mockAddSurveyParams } from '@/domain/test/mock-survey'
import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

let surveyCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })
  describe('add()', () => {
    it('Should add a survey on success', async () => {
      const sut = makeSut()

      await sut.add(mockAddSurveyParams())

      const survey = surveyCollection.findOne({ question: 'any_question' })

      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    it('Should load a list of surveys on success', async () => {
      const sut = makeSut()

      await surveyCollection.insertMany([mockAddSurveyParams(), mockAddSurveyParams()])
      const surveys = await sut.loadAll()

      expect(surveys).toHaveLength(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe('any_question')
    })

    it('Should load empty list', async () => {
      const sut = makeSut()

      const surveys = await sut.loadAll()

      expect(surveys).toHaveLength(0)
    })
  })

  describe('loadById()', () => {
    it('Should load a survey by id on success', async () => {
      const sut = makeSut()

      const { insertedId } = await surveyCollection.insertOne(mockAddSurveyParams())

      const survey = await sut.loadById(insertedId.toHexString())

      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })

    it('Should return undefined if survey not exist', async () => {
      const sut = makeSut()

      const survey = await sut.loadById(new ObjectId().toHexString())

      expect(survey).toBeUndefined()
    })
  })
})
