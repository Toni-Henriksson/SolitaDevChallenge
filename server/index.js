const express = require("express")
const app = express();
const mongoose = require('mongoose');
const RouteDataModel = require('./models/JourneyData');
const StationsDataModel = require('./models/StationsData');
const cors = require('cors');
require("dotenv").config();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URL);

// Endpoint gets all routedata from database. (We dont use this, dataset is so huge it would just crash the app.)
app.get("/getData", (req, res) => {
    RouteDataModel.find({distance:{$gt:10}, duration: {$gt:10}}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }).limit(40);
});

// Endpoint to handle paginated db search, this way we just get small chunk of data that user needs. Instantly. 
app.get("/getNextData", (req, res) => {
    console.log(req.query.next)
    RouteDataModel.find({distance:{$gt:10}, duration: {$gt:10}}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }).skip(req.query.next).limit(15);
});

// Paginated DB search for stations
app.get("/getStations", (req, res) => {
    console.log(req.query.next)
    StationsDataModel.find({}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }).skip(req.query.next).limit(6);
});

// Search db by station name
app.get("/getStationByName", (req, res) => {
    console.log(req.query.next)
    StationsDataModel.find({nimi: req.query.stationName}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }).limit(1);
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