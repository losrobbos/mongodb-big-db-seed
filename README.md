# Creating a huge DB

A huge DB setup can make sense to test read performance optimization e.g. with indexing and query result caching.

## Prepare

In seed.js => adapt the DATABASE_NAME and COLLECTION_NAME before running the script

## How to run

Install: `npm install`

Create the DB: `npm run seed` or directly: `node seed.js`

The script creates 100.000 documents.

In order to create a collection with 1 Million entries, simply run the script 10 times.

## Warning 

Do not (!) adapt the seed for loop from 100.000 to 1.000.000 iterations to create 1 million records with just one script call. 
It is likely that will cause a heap exception of your Node process due handling 1 Million Objects in Memory will likely exceed the set memory limits.
Alternatively you can increase the node heap memory limit once for the run of the script. But then don't forget to reset it after the script run.
