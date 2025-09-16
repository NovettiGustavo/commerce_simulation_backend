//Mapeamento de URL

const express = require("express");
const clienteController = require("@controllers/cliente.controller");

const router = express.Router();

router.get("/", (req,res) => clienteController.getAllClientes(req,res));
router.get("/:id" , (req, res) => clienteController.getClienteById(req,res));

router.post("/", (req,res) => clienteController.createCliente(req,res));

router.put("/:id", (req, res) => clienteController.updateCliente(req,res));

router.delete("/:id", (req,res) => clienteController.deleteCliente(req,res));

module.exports = router;