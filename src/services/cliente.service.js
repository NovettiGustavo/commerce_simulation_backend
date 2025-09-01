//Aplicar das regras de negócio, validar dados e tratar erros de negócio

const clienteRepository = require("../repositories/cliente.repository");
const tipoClienteRepository = require("../repositories/tipoCliente.repository");

class ClienteService {
    async getClienteById(id) {
        if (!id) {
            throw new Error("Id parameter is required to get cliente")
        }

        const cliente = await clienteRepository.findClienteById(id);

        if (!cliente) {
            throw new Error("Cliente not founded")
        }

        return cliente;

    }

    async getAllClientes() {
        const clientes = await clienteRepository.findAll();

        return clientes;
    }

    async createCliente(data) {
        const { s_nome_cliente, s_cpf_cliente } = data;
        let tipoClienteId = data.i_tipo_cliente || 1;
        try {
            if (!s_nome_cliente || !s_cpf_cliente) {
                throw new Error("Missing required fields")
            }

            if (tipoClienteId !== 1) {
                const type = await tipoClienteRepository.findTipoClienteById(tipoClienteId)
                if (!type) {
                    throw new Error("tipoCliente not found!")
                }
            }

            const newCliente = await clienteRepository.createCliente({
                ...data,
                i_tipo_cliente: tipoClienteId
            })

            return newCliente;
        } catch (error) {
            throw new Error("Error createCliente on cliente.service",error.message);
        }
    }

    async updateCliente(id,data){
        try{
            if(!id){
                throw new Error("ID is required to update Cliente")
            }

            const clienteExist = await clienteRepository.findClienteById(id);
            if(!clienteExist){
                throw new Error("Cliente not found")
            }

            if(data.i_tipocliente_tipocliente){
                const tipoClienteExist = await tipoClienteRepository.findTipoClienteById(data.i_tipocliente_tipocliente)

                if(!tipoClienteExist){
                    throw new Error("Send a valid tipocliente to update")
                }
            }

            const updatedCliente = await clienteRepository.updateCliente(id,data);
            return updatedCliente;
        }catch(error){
            throw new Error("Error on updateCliente in service",error.message)
        }
    };

    async deleteCliente(id){
        try{
            if(!id){
                throw new Error("ID is required to delete cliente")
            }

            const cliente = await clienteRepository.findClienteById(id)

            if(!cliente){
                throw new Error("Cliente not found")
            }

            if(!cliente.is_active){
                throw new Error("Cliente is already deactivated")
            }

            const deletedCliente = await clienteRepository.deleteCliente(id);
            return deletedCliente;
        }catch(error){
           console.error("Error on delete cliente in service:", error.message);
           throw new Error(`Error on delete cliente in service: ${error.message}`);
        }
    }
}

module.exports = new ClienteService();