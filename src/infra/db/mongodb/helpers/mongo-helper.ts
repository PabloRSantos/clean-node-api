import { Collection, MongoClient, Document } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },
  async disconnect () {
    await this.client.close()
    this.client = null
  },

  async getCollection<T = any>(name: string): Promise<Collection<T>> {
    if (!this.client) {
      await this.connect(this.uri)
    }

    return this.client.db().collection(name)
  },

  map: (data: Document): any => {
    const { _id, ...collectionWithoutId } = data

    return Object.assign({}, collectionWithoutId, { id: _id })
  },

  mapCollection: (collection: Document[]): any => {
    return collection.map(c => MongoHelper.map(c))
  }

}
