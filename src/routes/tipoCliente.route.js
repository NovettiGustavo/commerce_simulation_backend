const express = require("express");
const tipoClienteController = require("../controllers/tipoCliente.controller");

const router = express.Router();

router.get("/", (req,res) => tipoClienteController.getAllTipoCliente(req,res));
router.get("/:id", (req,res) => tipoClienteController.getTipoClienteById(req, res));

router.post("/", (req,res) => tipoClienteController.createTipoCliente(req,res));
router.put("/:id", (req,res) => tipoClienteController.updateTipoCliente(req,res));
router.delete("/:id", (req,res) => tipoClienteController.deleteTipoCliente(req,res));

module.exports = router;