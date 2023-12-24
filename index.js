require('dotenv').config()
const dbconnect = require('./dbconnect')


const express = require('express');
const app = express()

app.get('/' , (req,res) =>{
    res.status(200).json({message:"hello"})
})
app.listen(300,() =>{
    console.log('server started ')
    dbconnect()
})