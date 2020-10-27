/* eslint-disable no-console */
const MongoClient = require("mongodb").MongoClient;

let cachedDb = null;

export const connectToDatabase = async () => {
  if (cachedDb) {
    console.log("Use existing connection");
    return Promise.resolve(cachedDb);
  } else {
    return MongoClient.connect(process.env.MONGODB_URI, {
      native_parser: true,
      useUnifiedTopology: true,
    })
      .then((client) => {
        let db = client.db("recipes");
        console.log("New Database Connection");
        cachedDb = db;
        return cachedDb;
      })
      .catch((error) => {
        console.log("Mongo Connection error");
        console.log(error);
      });
  }
};
