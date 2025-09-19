const dotenv = require('dotenv');
const express = require('express');
const clienteRoutes = require("./routes/cliente.route")
const vendaRoutes = require("./routes/venda.route");
const tipoClienteRoutes = require("./routes/tipoCliente.route");
const corsHandler = require("@cors");
const internalErrors = require("@internal_errors")

dotenv.config();
const app = express();

app.use(express.json());
app.use(corsHandler);

app.use("/clientes", clienteRoutes);
app.use("/vendas", vendaRoutes);
app.use("/tipoclientes", tipoClienteRoutes);

app.get("/", (req, res) =>{
    res.send("API running");
})

app.use(internalErrors)

module.exports = app;
