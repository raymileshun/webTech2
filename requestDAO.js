/* MongoDB Related Code */
var ObjectId = require('mongodb').ObjectId;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
//const dbName = 'shutterAssignment';
const dbName = 'dummy';
const orderCollectionName = 'orders';
const shutterCollectionName = 'shutters';
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

function getShutters(callback){
    readRequests({},(result) => {callback(result)},shutterCollectionName)
}

function listOrdersOfCustomer(customerName,callback){
    readRequests({"order.customerName" : customerName},(result) => {callback(result)},orderCollectionName)
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

function updateOrder(orderid,index,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection= db.collection(orderCollectionName);
        const query =   { _id: ObjectId(orderid) };
        const setter = {["order.orders."+index+".assembled"]:"true"};
        collection.updateOne(query,{$set:setter}, (err,r)=> {
            if (err) console.log(err);
            callback();
            client.close();
        });
    })
}

function updateOrderInstallation(orderId,date,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection= db.collection(orderCollectionName);
        const query =   { _id: ObjectId(orderId) };
        const setter = {["order.installationDate"]:date};
        collection.updateOne(query,{$set:setter}, (err,r)=> {
            if (err) console.log(err);
            callback();
            client.close();
        });
    })
}

function updateOrderPayment(orderId,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection= db.collection(orderCollectionName);
        const query =   { _id: ObjectId(orderId) };
        const setter = {["order.isPaid"]:"true"};
        collection.updateOne(query,{$set:setter}, (err,r)=> {
            if (err) console.log(err);
            callback();
            client.close();
        });
    })
}


module.exports = {
    "createRequest" : createRequest,
    "getOrders": getOrders,
    "listOrdersOfCustomer": listOrdersOfCustomer,
    "updateOrderWithAssembling":updateOrder,
    "updateOrderWithInstallationDate":updateOrderInstallation,
    "getShutters":getShutters,
    "updateOrderWithPayment":updateOrderPayment
}