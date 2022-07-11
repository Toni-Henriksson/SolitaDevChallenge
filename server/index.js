const express = require("express")
const app = express();
const mongoose = require('mongoose');
const RouteDataModel = require('./models/JourneyData');
const cors = require('cors');
require("dotenv").config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL);
const distance = "Covered distance (m)";

// Endpoint gets all routedata from database.
app.get("/getData", (req, res) => {
    RouteDataModel.find({"Covered distance (m)": {$gt: 10000}}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Endpoint to add data to db 
app.post("/createRoute", async (req, res) => {
    const data = req.body;
    const newData =  new RouteDataModel(data);
    await newData.save();
    res.json(data);
});

app.listen(3001, () => {
    console.log("Server running!");
});