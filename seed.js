import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017")
const DATABASE_NAME = "big-db" // your database name here...
const COLLECTION_NAME = "bigcoll" // // rather dont use hyphens in collection, harder to maintain in mongo shell

// createCollection is a findOrCreate operation. In case the collection exists it does not throw an error
// do this behavior is not implemented in Mongoose. It is build into the MongoDB client itself!
const collection = await client.db(DATABASE_NAME).createCollection(COLLECTION_NAME) 

const proms = []
let batch = []

// create 100.000 records
for(let i=0; i<100000; i++) {

    // every third entry => alternate person name
    batch.push({ name: i % 3 === 0 ? "Rob" : "Stupid White Man" })

    // every 20.000 records => write Batch of objects to database
    if(i % 20000) {
        proms.push(collection.insertMany( batch ))
        batch = []
    }
}

// wait for all records to finish writing before closing db connection
await Promise.all(proms)

await client.close()
