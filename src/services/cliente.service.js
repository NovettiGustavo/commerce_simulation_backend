//Aplicar das regras de negócio, validar dados e tratar erros de negócio

const clienteRepository = require("../repositories/cliente.repository");

class ClienteService{
    async getClienteById(id){
        if(!id ){
            throw new Error("Id")
        }

        const cliente = await clienteRepository.findClienteById(id);

        if(!cliente){
            throw new Error("Cliente nou founded")
        }

        return cliente;

    }

    async getAllClientes(){
        const clientes = await clienteRepository.findAll();

         if(clientes.length === 0){
            throw new Error("No clientes founded in database")
        }
        return clientes;
    }
}

module.exports = new ClienteService();