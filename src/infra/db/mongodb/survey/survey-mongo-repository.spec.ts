import { Collection } from 'mongodb'
import { AddSurveyModel } from '@/domain/usecases'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  },
  {
    answer: 'other_answer'
  }],
  date: new Date()
})

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

      await sut.add(makeFakeSurveyData())

      const survey = surveyCollection.findOne({ question: 'any_question' })

      expect(survey).toBeTruthy()
    })
  })

  describe('load()', () => {
    it('Should load a list of surveys on success', async () => {
      const sut = makeSut()

      await surveyCollection.insertMany([makeFakeSurveyData(), makeFakeSurveyData()])
      const surveys = await sut.loadAll()

      expect(surveys).toHaveLength(2)
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

      const { insertedId } = await surveyCollection.insertOne(makeFakeSurveyData())

      const survey = await sut.loadById(insertedId as any)

      expect(survey).toBeTruthy()
    })

    it('Should return undefined if survey not exist', async () => {
      const sut = makeSut()

      const survey = await sut.loadById('any_id')

      expect(survey).toBeUndefined()
    })
  })
})
