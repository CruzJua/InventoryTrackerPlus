const path = require('path');
const debugLogger = require('../logger');

const log = debugLogger("DAL");

const {MongoClient, ObjectId} = require('mongodb');

const uri = process.env.CONNECTION_STRING;

const PLATFORM_DB = "InventoryTrackerPlus";

let dal = {
    createUser: async function ({ firstName, lastName, email, passwordHash, businessName, dbName }) {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const coll = client.db(PLATFORM_DB).collection("Users");
            const existing = await coll.findOne({ email });
            if (existing) return { error: "An account with that email already exists." };
            const result = await coll.insertOne({
                firstName,
                lastName,
                email,
                passwordHash,
                businessName,
                dbName,
                createdAt: new Date()
            });
            log("DAL - USER CREATED: " + email);
            return result;
        } finally {
            await client.close();
        }
    },

    getUserByEmail: async function (email) {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const coll = client.db(PLATFORM_DB).collection("Users");
            return await coll.findOne({ email });
        } finally {
            await client.close();
        }
    },
    getAllStock: async function (dbName, filter = null) {
        log("GETTING ALL STOCK FROM: " + dbName);
        const client = new MongoClient(uri);
        try{
            await client.connect()
            let coll = client.db(dbName).collection("Inventory");
            let results;
            if (filter == null){
                results = await coll.find().toArray();
            }else{
                results = await coll.find(filter).toArray();
            }
            log(results)
            return results;
        }finally{
            await client.close();
        }
    },
    getSingleStock: async function (dbName, _id) {
        log("DAL - GETTING SINGLE STOCK WITH ID: " + _id);
        const client = new MongoClient(uri);
        try{
            await client.connect()
            let coll = client.db(dbName).collection("Inventory");
            let result = await coll.findOne({_id: new ObjectId(_id)});
            log(result);
            return result;
        }finally{
            await client.close()
        }
    },
    createStock: async function (dbName, newStock) {
        log("DAL - CREATING STOCK IN: " + dbName);
        const client = new MongoClient(uri);
        try{
            await client.connect()
            let coll = client.db(dbName).collection("Inventory");
            let result = await coll.insertOne(newStock);
            log(result);
            return result;
        }finally{
            await client.close()
        }
    },
    updateQuantity: async function (dbName, updatedStock) {
        log("DAL - UPDATING QUANTITY IN: " + dbName);
        const client = new MongoClient(uri);
        const _id = updatedStock._id;
        const newQuantity = updatedStock.quantity;
        try{
            await client.connect()
            let coll = client.db(dbName).collection("Inventory");
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
