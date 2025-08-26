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

        if (tipoClientes.length === 0) {
            throw new Error("No TipoCliente found in database");
        }

        return tipoClientes;
    }
}

module.exports = new TipoClienteService();
