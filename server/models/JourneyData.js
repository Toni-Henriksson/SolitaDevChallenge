const mongoose = require('mongoose')

const RouteDataSchema = new mongoose.mongoose.Schema({
    startlocation: {
        type: String,
        required: true,
    },
    endlocation: {
        type: String,
        required: true,
    },
    starttime: {
        type: Date,
        required: true,
    },
    endtime: {
        type: Date,
        required: true,
    }
});

const RouteDataModel = mongoose.model("SolitaHaaste2022", RouteDataSchema)
module.exports = RouteDataModel;