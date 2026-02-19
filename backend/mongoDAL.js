const {MongoClient, ObjectId} = require('mongodb');

// FOR DEV----Be sure you take out the placeholder credentials and replace with real username and password for Mongo
const uri = "mongodb+srv://dev:Password123@cluster0.v1cucnn.mongodb.net/";
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