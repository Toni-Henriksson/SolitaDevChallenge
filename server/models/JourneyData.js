const mongoose = require('mongoose')
const departureStation = "Departure station name";
const returnStation = "Return station name";
const distance = "Covered distance (m)";
const duration = "Duration (sec)";
const RouteDataSchema = new mongoose.mongoose.Schema({
    departure: {
        type: String,
        required: true,
    },
    Return: {
        type: String,
        required: true,
    },
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
        type: Object,
        required: true,
    },
});

const RouteDataModel = mongoose.model("Journey_Data", RouteDataSchema)
module.exports = RouteDataModel;