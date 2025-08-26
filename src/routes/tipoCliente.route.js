const express = require("express");
const tipoClienteController = require("../controllers/tipoCliente.controller");

const router = express.Router();

router.get("/", (req,res) => tipoClienteController.getAllTipoCliente(req,res));
router.get("/:id", (req,res) => tipoClienteController.getTipoClienteById(req, res));

module.exports = router;