const tipoClienteRepository = require("@repositories/tipoCliente.repository");
const clienteRepository = require("@repositories/cliente.repository");

class ClienteValidator {
    static async validateCreate(data) {
        const { s_nome_cliente, s_cpf_cliente } = data;
        let tipoClienteId = data.i_tipo_cliente || 1;

        if (!s_nome_cliente || !s_cpf_cliente) {
            throw new Error("Missing required fields")
        }

        if (tipoClienteId !== 1) {
            const type = await tipoClienteRepository.findTipoClienteById(tipoClienteId)
            if (!type) {
                throw new Error("tipoCliente not found!")
            }
        }

        return {
            ...data,
            i_tipo_cliente: tipoClienteId
        }

    }

    static async validateUpdate(id, data) {
        if (!id) {
            throw new Error("ID is required to update Cliente")
        }

        const clienteExist = await clienteRepository.findClienteById(id);
        if (!clienteExist) {
            throw new Error("Cliente not found")
        }

        if (data.i_tipocliente_tipocliente) {
            const tipoClienteExist = await tipoClienteRepository.findTipoClienteById(data.i_tipocliente_tipocliente)

            if (!tipoClienteExist) {
                throw new Error("Send a valid tipocliente to update")
            }
        }

        return data;
    }

    static async validateDelete(id) {
        if (!id) {
            throw new Error("ID is required to delete cliente")
        }

        const cliente = await clienteRepository.findClienteById(id)

        if (!cliente) {
            throw new Error("Cliente not found")
        }

        if (!cliente.is_active) {
            throw new Error("Cliente is already deactivated")
        }

        return cliente;
    }
}

module.exports = ClienteValidator