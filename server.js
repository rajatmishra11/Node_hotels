const express = require("express");
const app = express();
//(app) ek naksha hai-

// app.get("/", function (req, res) {
//   res.send("Welcome to Hotel.. How can i help u?");
// });

//Methods of share data-> CRUD opearions
/*
    -How data is send and recieve between a client and server(built with node.js)
    -There a lots of methods there acoocrdinng to there needs-

    C       -GET        (fetch the web page, i.e request data from sever - READ ONLY)
    R       -POST       (send data to server, include in the body of request.)
    U       -PUT/PATCH  (partial updates for resources, set of modifications to be applied)
    D       -DELETE     (delete specic resource on the server)
*/

/*
app.get("/", function (req, res) {
  res.send("Welcome to Hotel.. How can i help u with list of menu?");
});
app.get("/chicken", function (req, res) {
  res.send("chicken is served");
});
app.get("/pork", function (req, res) {
  res.send("Welcome to Hotel.. Pork is to be served");
});
app.get("/idli", function (req, res) {
  //creating js object
  var customized_idli={
        name: 'rava idli',
        size: "regular",
        is_sambhar: true,
        is_chutney: false,
  }
  res.send(customized_idli);
});

//      Learning Postman->
app.post("/items", (req, res) =>{
    console.log("Data is received");
})
*/




const bodyParser = require("body-parser");
app.use(bodyParser.json()); //saves data in req.body

//Middleware Function->
const logRequest =(req, res , next )=>{
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest)


//DataBase connection->
const db = require("./db");
require('dotenv').config();
const passport=require('./auth');



const menuItem = require("./models/menuItem");


app.use(passport.initialize());

app.use(logRequest);  //Saare Routes pe Logging lagaane ke liye   
const localAuthMiddleware= passport.authenticate('local', {session: false});


app.get("/" , function (req, res) {
  res.send("Welcome to Hotel.. How can i help u with list of menu?");
});

//      Post route to add a person
// app.post('/person', async (req, res)=>{

//     try{
//       //1.    Assuming the request body contains the person data
//       const data = req.body;

//       //2.    alternate method  - automatically assinging the data
//       const newPerson = new Person(data);
//       //3.    Save the new Person to the database
//       const response = await newPerson.save();
//       console.log("Data Saved");
//       res.status(200).json(response);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'})
//     }

//     //2.    create a new Person document usng the moongoose model

//     /*
//     //long Procedure one by one- use alternate
//     const newPerson = new Person();
//     newPerson.name = data.name;
//     newPerson.age= data.age;
//     newPerson.work = data.work;
//     newPerson.mobile= data.mobile;
//     newPerson.email= data.email;
//     newPerson.address = data.address;
//     newPerson.salary = data.salary;
//     */

//     //3.    Save the new Person to the database-
//     //old method using callback is not eeficient- use async await , in try catch block
//     // newPerson.save( (error, savedPerson)=>{
//     //     if(error){
//     //         console.log("Error in Saving Person Data");
//     //         res.status(500).json({error : "internal Server Error"} );
//     //     }
//     //     else {
//     //         console.log('Data is Saved');
//     //         res.status(200).json({savedPerson});
//     //     }
//     // })

// })

//GET Method to get person
// app.get("/person", async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log("Data Fetched Succesfully");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

//    Post method to add a menu item
// app.post('/menu', async (req, res)=>{
//     try{
//       const data = req.body;
//       const newMenu = new menuItem(data);
//       const response = await newMenu.save();
//       console.log("Menu data is saved");
//       res.status(200).json(response);
//     }
//     catch(err){
//       console.log(err)
//       res.status(500).json({error : 'Internal Server error'})
//     }
// })

// //Get method to get the Menu Items
// app.get('/menu', async (req, res)=>{
//     try {
//       const data= await menuItem.find();
//       console.log('menu data is fetched')
//       res.status(200).json(data)
//     }
//     catch (error) {
//       console.log(err)
//       res.status(500).json({error : 'Internal Server Error'});
//     }
// } )

//end points ->
// app.get("/person/:workType", async (req, res) => {
//   try {
//     const workType = req.params.workType;
//     if (workType == "chef" || workType == "manager" || workType == "waiter") {
//       const response = await Person.find({ work: workType });
//       console.log("response fetched");
//       res.status(200).json(response);
//     } else res.status(404).json({ error: "Invalid Work Type" });
//   } catch (error) {
//     console.log(error);
//     {
//       res.status(500).json({ error: "Internal  Server Error" });
//     }
//   }
// });

//Import the router files
const personRoutes = require("./routes/personRoutes");
app.use("/person",localAuthMiddleware, personRoutes);

const menuItemRoutes = require("./routes/menuRoutes");
app.use("/menu", menuItemRoutes);


//using .env file-> port 
const PORT= process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Port ${PORT} is live`);
});
