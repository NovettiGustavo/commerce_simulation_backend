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

        return clientes;
    }
}

module.exports = new ClienteService();