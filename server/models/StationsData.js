const mongoose = require('mongoose')
mongoose.pluralize(null);

const StationsDataSchema = new mongoose.mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Adress: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Owner: {
        type: String,
        required: true,
    },
    Capacity: {
        type: String,
        required: true,
    }
});

const StationsDataModel = mongoose.model("stations", StationsDataSchema)
module.exports = StationsDataModel;