const mongoose = require('mongoose')
mongoose.pluralize(null);
const departureStation = "Departure station name";
const returnStation = "Return station name";
const distance = "Covered distance (m)";
const duration = "Duration (sec)";
const dbName = "journeydata";

const RouteDataSchema = new mongoose.mongoose.Schema({
    [departureStation]: {
        type: String,
        required: true,
    },
    [returnStation]: {
        type: String,
        required: true,
    },
    [distance]: {
        type: String,
        required: true,
    },
    [duration]: {
        type: String,
        required: true,
    }
});

const RouteDataModel = mongoose.model(dbName, RouteDataSchema)
module.exports = RouteDataModel;