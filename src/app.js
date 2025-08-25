const dotenv = require('dotenv');
const express = require('express');
const clienteRoutes = require("./routes/cliente.route")

dotenv.config();
const app = express();

app.use(express.json());

app.use("/clientes", clienteRoutes)

app.get("/", (req, res) =>{
    res.send("API ok");
})

module.exports = app;
