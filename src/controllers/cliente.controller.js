const clienteService = require('../services/cliente.service');

class ClienteController{
    async getClienteById(req, res){
        try{
             const {id} = req.params;
             const cliente = await clienteService.getClienteById(Number(id));

             if(!cliente){
                return res.status(400).json({error: "Cliente não encontrado"})
             }
             return res.status(200).json(cliente)
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }

    async getAllClientes(req,res){
        try{
            const clientes = await clienteService.getAllClientes();
            return res.status(200).json(clientes)
        }catch(error){  
            return res.status(400).json({error: error.message});
        }
    }
}

module.exports = new ClienteController();