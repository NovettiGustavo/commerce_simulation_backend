const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("API ok");
})

module.exports = app;
