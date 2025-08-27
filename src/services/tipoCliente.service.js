const tipoClienteRepository = require("../repositories/tipoCliente.repository");

class TipoClienteService {
    async getTipoClienteById(id) {
        if (!id) {
            throw new Error("Missing id parameter");
        }

        const tipoCliente = await tipoClienteRepository.findTipoClienteById(id);

        if (!tipoCliente) {
            throw new Error("TipoCliente not found!");
        }

        if (tipoCliente.cliente.length === 0) {
            throw new Error("TipoCliente does not have any associated clients");
        }

        return tipoCliente;
    }

    async getAllTipoClientes() {
        const tipoClientes = await tipoClienteRepository.findAll();

        return tipoClientes;
    }

    async createTipoCliente(data) {
        const { s_dsctipocliente_tipocliente } = data;

        try {
            if (!s_dsctipocliente_tipocliente) {
                throw new Error("tipoCliente description is required")
            }

            const newTipoCliente = await tipoClienteRepository.createTipoCliente({
                ...data
            })

            return newTipoCliente
        } catch (error) {
            console.error("Error in TipoCliente Service:", error.message);
            throw new Error("Failed to create TipoCliente");
        }
    }

}

module.exports = new TipoClienteService();
