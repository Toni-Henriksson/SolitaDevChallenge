const mongoose = require('mongoose')
mongoose.pluralize(null);

const StationsDataSchema = new mongoose.mongoose.Schema({
    Nimi: {
        type: String,
        required: true,
    },
    Osoite: {
        type: String,
        required: true,
    },
    Kaupunki: {
        type: String,
        required: true,
    },
    Omistaja: {
        type: String,
        required: true,
    },
    Kapasiteetti: {
        type: String,
        required: true,
    },
    x: {
        type: String,
        required: true,
    },
    y: {
        type: String,
        required: true,
    },
});

const StationsDataModel = mongoose.model("stations", StationsDataSchema)
module.exports = StationsDataModel;