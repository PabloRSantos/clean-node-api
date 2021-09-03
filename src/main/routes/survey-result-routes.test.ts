import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import { env } from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const { insertedId: accountId } = await accountCollection.insertOne({
    name: 'Pablo',
    email: 'pablo.rosa@mail.com',
    password: '123'
  })

  const user = await accountCollection.findOne({ _id: accountId })

  const accessToken = sign({ id: user.id }, env.jwtSecret)

  await accountCollection.updateOne({ _id: accountId }, { $set: { accessToken } })

  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answers: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 204 on save survey result with valid token', async () => {
      const accessToken = await makeAccessToken()
      const { insertedId } = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2',
          image: 'http://image-name.com'
        }],
        date: new Date()
      })

      const surveyId = new ObjectId(insertedId).toHexString()

      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')

        .expect(403)
    })

    test('Should return 204 on save survey result with valid token', async () => {
      const accessToken = await makeAccessToken()
      const { insertedId } = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2',
          image: 'http://image-name.com'
        }],
        date: new Date()
      })

      const surveyId = new ObjectId(insertedId).toHexString()

      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
