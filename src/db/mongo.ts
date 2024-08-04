import { MongoClient, ServerApiVersion } from 'mongodb'
import { MONGO_URI } from '$env/static/private'

const client = new MongoClient(MONGO_URI, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
   }
})

export function start_mongo() {
   console.log('Starting MongoDB')
   return client.connect()
}

export default client.db()
