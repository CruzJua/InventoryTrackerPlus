const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const {MongoClient, ObjectId} = require('mongodb');

const uri = process.env.CONNECTION_STRING;

let dal = {
    getAllStock: async function (filter = null) {
        console.log("(DAL) GETTING ALL STOCK");
        const client = new MongoClient(uri);
        try{
            await client.connect()
            let db = await client.db("Inventory");
            let coll = await db.collection("DuckView_Stock")
            let results;
            if (filter == null){
                results = await coll.find().toArray();
            }else{
                //With this structure, we must validate the filter in the API and make sure it is a valid query up there
                results = await coll.find(filter).toArray();
            }
            console.log(results)
            return results;
        }finally{
            await client.close();
        }
    }
}
exports.dal = dal;