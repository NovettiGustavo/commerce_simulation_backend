const express = require("express");
const vendaController = require("@controllers/venda.controller");

const router = express.Router();

router.get("/", (req,res) => vendaController.getAllVendas(req,res));
router.get("/:id" , (req,res) => vendaController.getVendaById(req,res));
router.post("/", (req,res) => vendaController.createVenda(req,res));
router.put("/:id", (req,res) => vendaController.updateVenda(req,res));
router.delete("/:id", (req,res) => vendaController.deleteVenda(req,res));

module.exports = router;

