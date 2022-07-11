const mongoose = require('mongoose')
mongoose.pluralize(null);
const departureStation = "Departure station name";
const returnStation = "Return station name";
const distance = "Covered distance (m)";
const duration = "Duration (sec)";
const dbName = "journeydata";

const RouteDataSchema = new mongoose.mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
});

const RouteDataModel = mongoose.model(dbName, RouteDataSchema)
module.exports = RouteDataModel;