import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'

let surveyCollection: Collection
let accountCollection: Collection

// const makeAccessToken = async (role?: string): Promise<string> => {
//   const { insertedId: accountId } = await accountCollection.insertOne({
//     name: 'Pablo',
//     email: 'pablo.rosa@mail.com',
//     password: '123',
//     role: role || undefined
//   })

//   const user = await accountCollection.findOne({ _id: accountId })

//   const accessToken = sign({ id: user.id }, env.jwtSecret)

//   await accountCollection.updateOne({ _id: accountId }, { $set: { accessToken } })

//   return accessToken
// }

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
  })
})
