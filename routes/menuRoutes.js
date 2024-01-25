const express = require("express");
const router = express.Router();
const menuItem = require("../models/menuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new menuItem(data);
    const response = await newMenu.save();
    console.log("Menu data is saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

//Get method to get the Menu Items
router.get("/", async (req, res) => {
  try {
    const data = await menuItem.find();
    console.log("Menu data is fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:tastetype", async (req, res) => {
  try {
    const tastetype = req.params.tastetype;
    if (tastetype == "sweet" || tastetype == "spicy" || tastetype == "wsour") {
      const response = await menuItem.find({ taste: tastetype });
      console.log("response fetched");
      res.status(200).json(response);
    } else res.status(404).json({ error: "Invalid taste Type" });
  } catch (error) {
    console.log(error);
    {
      res.status(500).json({ error: "Internal  Server Error" });
    }
  }
});

module.exports = router;
