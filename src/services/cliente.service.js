//Aplicar das regras de negócio, validar dados e tratar erros de negócio

const clienteRepository = require("../repositories/cliente.repository");
const tipoClienteRepository = require("../repositories/tipoCliente.repository");

class ClienteService {
    async getClienteById(id) {
        if (!id) {
            throw new Error("Id")
        }

        const cliente = await clienteRepository.findClienteById(id);

        if (!cliente) {
            throw new Error("Cliente nou founded")
        }

        return cliente;

    }

    async getAllClientes() {
        const clientes = await clienteRepository.findAll();

        return clientes;
    }

    async createCliente(data) {
        const { s_nome_cliente, s_cpf_cliente, d_nasc_cliente, i_tipo_cliente } = data;
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
            throw new Error(error.message);
        }
    }
}

module.exports = new ClienteService();