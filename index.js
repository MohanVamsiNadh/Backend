require('dotenv').config()
const dbconnect = require('./dbconnect')


const express = require('express');
const app = express()

app.get('/' , async (req,res) =>{
    await dbconnect()
    res.status(200).json({message:"hello"})
})

export default app;
