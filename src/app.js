const dotenv = require('dotenv');
const express = require('express');
const clienteRoutes = require("./routes/cliente.route")
const vendaRoutes = require("./routes/venda.route");
const tipoClienteRoutes = require("./routes/tipoCliente.route");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/clientes", clienteRoutes);
app.use("/vendas", vendaRoutes);
app.use("/tipoclientes", tipoClienteRoutes);

app.get("/", (req, res) =>{
    res.send("API running");
})

module.exports = app;
