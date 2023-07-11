require('dotenv').config();
const mongoose = require('mongoose')

const db = process.env.DB_DATABASE

mongoose.connect(db).then(()=>{
    console.log('Database Connected')
}).catch(()=>{
    console.log('Database Disconnected')
})