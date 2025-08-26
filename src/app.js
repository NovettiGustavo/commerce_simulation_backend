const dotenv = require('dotenv');
const express = require('express');
const clienteRoutes = require("./routes/cliente.route")
const vendaRoutes = require("./routes/venda.route");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/clientes", clienteRoutes)
app.use("/vendas", vendaRoutes)

app.get("/", (req, res) =>{
    res.send("API ok");
})

module.exports = app;
