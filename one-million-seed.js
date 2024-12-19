import { MongoClient } from "mongodb";

const client = await MongoClient.connect("mongodb://localhost:27017")

// createCollection is a findOrCreate operation. In case the collection exists it does not throw an error
// do this behavior is not implemented in Mongoose. It is build into the MongoDB client itself!
const collection = await client.db("big-db").createCollection("bigcoll") // dont use hyphens in collection, hard to access in mongo shell!

const proms = []
let batch = []
for(let i=0; i<100000; i++) {

    batch.push({ name: i % 3 === 0 ? "Rob" : "Stupid White Man" })

    if(i % 20000) {
        proms.push(collection.insertMany( batch ))
        batch = []
    }
}

// wait for all records to get inserted
await Promise.all(proms)

await client.close()