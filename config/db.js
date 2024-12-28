// PracticalTask
// Practical01
// mongodb+srv://praptipatel260108:Practical01@cluster0.z6uqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://praptipatel260108:prapti1234@cluster0.lnaf7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("database is connected")
})

module.exports = db;