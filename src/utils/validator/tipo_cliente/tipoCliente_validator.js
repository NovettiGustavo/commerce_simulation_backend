const tipoClienteRepository = require("../repositories/tipoCliente.repository");
const clienteRepository = require("../repositories/cliente.repository");

class TipoClienteValidator {
    static async validateGetById(id) {
        if (!id) {
            throw new Error("Missing id parameter");
        }

        const tipoCliente = await tipoClienteRepository.findTipoClienteById(id);

        if (!tipoCliente) {

            throw new Error("TipoCliente not found!");
        }

        return tipoCliente;
    }

    static async validateCreate(data) {
        const { s_dsctipocliente_tipocliente } = data;

        if (!s_dsctipocliente_tipocliente) {
            throw new Error("tipoCliente description is required")
        }

        return {
            ...data
        }

    }

    static async validateUpdate(id,data) {
        if (!id) {
            throw new Error("ID is required param to update tipocliente")
        }

        const tipoClienteExist = await tipoClienteRepository.findTipoClienteById(id);
         if (!tipoClienteExist) {
        throw new Error("tipocliente not found");
    }

        if (data.s_dsctipocliente_tipocliente && data.s_dsctipocliente_tipocliente.trim() === "") {
        throw new Error("tipoCliente description cannot be empty");
    }

    return data;
    }

    static async validateDelete(id){
         if (!id) throw new Error("ID is required to delete tipocliente");

            const tipoCliente = await tipoClienteRepository.findTipoClienteById(id)

            if (!tipoCliente) throw new Error("tipocliente not found in the database");

            const clientes = await clienteRepository.findClienteByTipo(id);

            if (clientes.length > 0) throw new Error("TipoCliente is in use by clients and cannot be deleted");

            return { id };
    }
}

module.exports = new TipoClienteValidator();