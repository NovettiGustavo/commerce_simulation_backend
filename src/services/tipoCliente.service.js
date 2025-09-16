const tipoClienteRepository = require("../repositories/tipoCliente.repository");
const TipoClienteValidator = require("../utils/validator/tipo_cliente/tipoCliente_validator")
const clienteRepository = require("../repositories/cliente.repository");

class TipoClienteService {
    async getTipoClienteById(id) {
        try {
            const validatedData = await TipoClienteValidator.validateGetById(id)

            return validatedData;
        } catch (error) {
            console.error("Error in TipoCliente Service:", error.message);
            throw new Error(`Failed to get TipoCliente by id: ${error.message}`);
        }

    }

    async getAllTipoClientes() {
        try {
            const tipoClientes = await tipoClienteRepository.findAll();

            return tipoClientes;
        } catch (error) {
            console.error("Error in TipoCliente Service:", error.message);
            throw new Error("Failed to get all TipoCliente");
        }

    }

    async createTipoCliente(data) {
        

        try {
           const validatedData = await TipoClienteValidator.validateCreate(data);
            const newTipoCliente = await tipoClienteRepository.createTipoCliente(
                validatedData
            )

            return newTipoCliente
        } catch (error) {
            console.error("Error in TipoCliente Service:", error.message);
            throw new Error(`Failed to create TipoCliente: ${error.message}`);
        }
    };

    async updateTipoCliente(id,data) {
        try {
            const validatedData = await TipoClienteValidator.validateUpdate(id,data)
            const updatedTipoCliente = await tipoClienteRepository.updateTipoCliente(id, validatedData);
            return updatedTipoCliente;

        } catch (error) {
            throw new Error(`Error updating tipocliente in service: ${error.message}`)
        }
    };

    async deleteTipoCliente(id) {
        try {
           
            await TipoClienteValidator.validateDelete(id);
            const deletedTipoCliente = await tipoClienteRepository.deleteTipoCliente(id);
            return deletedTipoCliente;

        } catch (error) {
            console.error("Error on delete tipocliente in service:", error.message);
            throw new Error(`Error on delete tipocliente in service: ${error.message}`);
        }
    }

}

module.exports = new TipoClienteService();
