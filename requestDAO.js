/* MongoDB Related Code */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
//const dbName = 'shutterAssignment';
const dbName = 'dummy';
const orderCollectionName = 'orders';
// Create a new MongoClient

/* Mongo DB Ends*/

function readRequests(findParams, callback, collectionName){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        //console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection= db.collection(collectionName)

        collection.find(findParams).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}

function getOrders(callback){
    readRequests({},(result) => {callback(result)},orderCollectionName)
}


function createRequest(request,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);

        const db = client.db(dbName);
        const collection= db.collection(orderCollectionName);

        collection.insertOne(request,(err,r)=>{
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            client.close();
            callback()
        })
    })
}


module.exports = {
    "createRequest" : createRequest,
    "getOrders": getOrders
}