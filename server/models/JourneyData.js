const mongoose = require('mongoose')
mongoose.pluralize(null);

const RouteDataSchema = new mongoose.mongoose.Schema({
    Departure: {
        type: String,
        required: true,
    },
    Return: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    departurestation: {
        type: String,
        required: true,
    },
    returnstation: {
        type: String,
        required: true,
    },
    returnstationid: {
        type: String,
        required: true,
    },
    departurestationid: {
        type: String,
        required: true,
    }
});

const RouteDataModel = mongoose.model(dbName, RouteDataSchema)
module.exports = RouteDataModel;