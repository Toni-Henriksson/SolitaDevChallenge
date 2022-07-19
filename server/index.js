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

// see for explanation of mongoose find function: https://www.geeksforgeeks.org/mongoose-find-function/
// Documentation for mongoose db models: https://mongoosejs.com/docs/models.html

// Endpoint to handle paginated db search, this way we just get small chunk of data that user needs. Instantly. 
app.get("/getNextData", (req, res) => {
    RouteDataModel.find({distance:{$gt:10}, duration: {$gt:10}}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }).skip(req.query.next).limit(8);
});

// Paginated DB search for stations
app.get("/getStations", (req, res) => {
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
    let station = req.query.stationName;
    StationsDataModel.find({Nimi:station}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            if(result){
                res.json(result);
            }
        }
    }).limit(1);
});

// Calculates stations total journeys from and to station. 
// Returns two values: total departures from station and total returns to station
app.get("/getStationJourneys", (req, res) => {
    let stationID = req.query.stationid;
    RouteDataModel.find({departurestationid:stationID}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            if(result){
                let departuresFromStation = result.length;
                RouteDataModel.find({returnstationid:stationID}, (err, result2) => {
                    if(err) {
                        res.json(err);
                    } else {
                        if(result){
                            let calculatedResult = [{
                                departures: departuresFromStation,
                                returns: result2.length
                            }];
                            res.json(calculatedResult);
                        }
                    }
                });
            }
        }
    });
});

// Search db by station name
app.get("/getJourneysFromLocation", (req, res) => {
    let location = req.query.parameter;
    RouteDataModel.find({departurestation:location}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            if(result){
                res.json(result);
            }
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