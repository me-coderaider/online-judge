const mongodb=require('mongodb');
// const dotenv=require("dotenv");

// dotenv.config();

let db;

const mongoConnect= callback =>{
    const MongoClient=mongodb.MongoClient;
    // this connect() function will take URL as input to connect to database and this
    // connect methods returns a promise, which can fail or succeed
    const MONGODB_URL=process.env.MONGODB_URL;
    // console.log(MONGODB_URL);
    MongoClient.connect(MONGODB_URL)
    .then(client =>{
        console.log("connected to database!");
        db=client.db();
        callback();
        
    })
    .catch(err=>{
        console.log('error is tthere')
        console.log(err);
        throw err;
    });
};

const getDb = () =>{
    if(db){
        return db;
    }
    throw 'No database found';
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;


