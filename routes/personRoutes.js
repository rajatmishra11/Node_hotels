const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Person Data Fetched Succesfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else res.status(404).json({ error: "Invalid Work Type" });
  } catch (error) {
    console.log(error);
    {
      res.status(500).json({ error: "Internal  Server Error" });
    }
  }
});

//update opeartion-- USE OF PUT
/*
Need of 2 things 
1.  which record we want to update?
2.  what exactly we want to update?
 */
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from the url parameter
    const updatePersonData = req.body; //updated data for the person
    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true, //return the updated document
        runValidators: true, //run Moongose Validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person Not Found" });
    }

    console.log("data has been updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erorr: "Internal Server Error" });
  }
});

//Delete Operation -
//only need one thing -> record
//use .delete end point

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person Not Found" });
    }
    console.log("data has been deleted");
    res.status(200).json({ messege: "Person deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erorr: "Internal Server Error" });
  }
});
module.exports = router;
