const path = require('path');
const debugLogger = require('../logger');

const log = debugLogger("DAL");

const {MongoClient, ObjectId} = require('mongodb');

const uri = process.env.CONNECTION_STRING;

let dal = {
    getAllStock: async function (filter = null) {
        log("GETTING ALL STOCK");
        const client = new MongoClient(uri);
        try{
            await client.connect()
            let db = await client.db("DuckView");
            let coll = await db.collection("Inventory")
            let results;
            if (filter == null){
                results = await coll.find().toArray();
            }else{
                //With this structure, we must validate the filter in the API and make sure it is a valid query up there
                results = await coll.find(filter).toArray();
            }
            log(results)
            return results;
        }finally{
            await client.close();
        }
    },
    getSingleStock: async function (_id) {
        log("DAL - GETTING SINGLE STOCK WITH ID: " + _id);
        const client = new MongoClient(uri);
        try{
            await client.connect()
            let db = await client.db("DuckView");
            let coll = await db.collection("Inventory");
            let result = await coll.findOne({_id: new ObjectId(_id)});
            log(result);
            return result;
        }finally{
            await client.close()
        }
    },
    updateQuantity: async function (updatedStock) {
        log("DAL - UPDATING QUANTITY");
        const client = new MongoClient(uri);
        const _id = updatedStock._id;
        const newQuantity = updatedStock.quantity;
        try{
            await client.connect()
            let db = await client.db("DuckView");
            let coll = await db.collection("Inventory");
            await coll.updateOne({_id: new ObjectId(_id)}, {$set: {quantity: newQuantity}});
            let result = await coll.findOne({_id: new ObjectId(_id)});
            log(result);
            return result;
        }finally{
            await client.close()
        }
    }
}
exports.dal = dal;