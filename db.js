const mongoose = require("mongoose");

//1.    Define the MongodB Connection->
//const mongoUrl= 'mongodb://127.0.0.1:27017/hotels';  //local computer-> mongoDB_Compass
require('dotenv').config();

const mongoUrl = process.env.DB_URL;
//Setup of Online dB -> mongoDB_Atlas

//2.    setup MongodB connection
mongoose.connect(mongoUrl, {});

//3.   Accesing the Default Connection Object
//          Mongoose maintains a default connection Object representing the MongoDB Connection.
const db = mongoose.connection;

//4.    Define Event Listers for database Connection
db.on("connected", () => {
  console.log("Connected to MongodB server");
});

db.on("disconnected", () => {
  console.log("Disconnected");
});

db.on("error", () => {
  console.log("Error");
});

//5.    export the database->
module.exports = db;
