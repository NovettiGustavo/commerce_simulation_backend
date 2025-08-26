//Recebimento de requisições HTTP e devolução de respostas HTTP

const clienteService = require('../services/cliente.service');

class ClienteController{
    async getClienteById(req, res){
        try{
             const {id} = req.params;
             const cliente = await clienteService.getClienteById(Number(id));

             if(!cliente){
                return res.status(400).json({error: "Cliente not founded"})
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

    async createCliente(req,res){
        try{
            const {s_nome_cliente,s_cpf_cliente,d_nasc_cliente,i_tipo_cliente} = req.body;

            if(!s_nome_cliente || !s_cpf_cliente){
                return res.status(400).json({message: "Name and CPF required!"})
            }

            const newCliente = await clienteService.createCliente({
                s_nome_cliente,
                s_cpf_cliente,
                d_nasc_cliente,
                i_tipo_cliente
            })

            return res.status(201).json(newCliente)
        }catch(error){
            console.error("Error create cliente:", error.message)
            return res.status(500).json({error:error.message})
        }
    }
}

module.exports = new ClienteController();