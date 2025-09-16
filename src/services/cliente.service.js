//Aplicar das regras de negócio, validar dados e tratar erros de negócio

const clienteRepository = require("../repositories/cliente.repository");
const ClienteValidator = require("../utils/validator/cliente/cliente-validator")

class ClienteService {
    async getClienteById(id) {
        try {
            if (!id) {
                throw new Error("Id parameter is required to get cliente")
            }

            const cliente = await clienteRepository.findClienteById(id);

            if (!cliente) {
                throw new Error("Cliente not founded")
            }

            return cliente;
        } catch (error) {
            console.error("Error in Cliente Service:", error.message);
            throw new Error("Failed to get Cliente by id");
        }


    }

    async getAllClientes() {
        try {
            const clientes = await clienteRepository.findAll();

            return clientes;
        } catch (error) {
            console.error("Error in Cliente Service:", error.message);
            throw new Error("Failed to get all Clientes");
        }

    }

    async createCliente(data) {

        try {
            const validatedData = await ClienteValidator.validateCreate(data);


            const newCliente = await clienteRepository.createCliente(
                validatedData
            )

            return newCliente;
        } catch (error) {
            console.error("Error createCliente on cliente.service:", error.message);
            throw new Error(`Error createCliente on cliente.service: ${error.message}`);

        }
    }

    async updateCliente(id, data) {
        try {
            const validatedData = await ClienteValidator.validateUpdate(id, data)

            const updatedCliente = await clienteRepository.updateCliente(id, validatedData);
            return updatedCliente;
        } catch (error) {
            console.error("Error on updateCliente in service:", error.message);
            throw new Error(`Error on updateCliente in service: ${error.message}`);

        }
    };

    async deleteCliente(id) {
        try {
            const validatedData = await ClienteValidator.validateDelete(id)

            const deletedCliente = await clienteRepository.deleteCliente(validatedData.i_cliente_cliente);
            return deletedCliente;
        } catch (error) {
            console.error("Error on delete cliente in service:", error.message);
            throw new Error(`Error on delete cliente in service: ${error.message}`);
        }
    }
}

module.exports = new ClienteService();