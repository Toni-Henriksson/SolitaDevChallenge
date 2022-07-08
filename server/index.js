const express = require("express")
const app = express();
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://tonba:Asted9292@cluster0.b5ghr.mongodb.net/SolitaHaaste2022?retryWrites=true&w=majority")

app.listen(3001, () => {
    console.log("Server running!");
})