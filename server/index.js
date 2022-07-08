const express = require("express")
const app = express();
const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL);

app.listen(3001, () => {
    console.log("Server running!");
})