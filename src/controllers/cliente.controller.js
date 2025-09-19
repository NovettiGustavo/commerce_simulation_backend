//Recebimento de requisições HTTP e devolução de respostas HTTP

const clienteService = require('@services/cliente.service');
const { ValidationError, NotFoundError } = require("@errors")

class ClienteController {
    async getClienteById(req, res) {
        try {
            const { id } = req.params;
            const cliente = await clienteService.getClienteById(Number(id));

            if (!cliente) {
                throw new ValidationError("ID parameter is required!")
            }
            return res.status(200).json(cliente)
        } catch (error) {
            next(error)
        }
    }

    async getAllClientes(req, res) {
        try {
            const clientes = await clienteService.getAllClientes();
            return res.status(200).json(clientes)
        } catch (error) {
            next(error)
        }
    }

    async createCliente(req, res) {
        try {
            const { s_nome_cliente, s_cpf_cliente, d_nasc_cliente, i_tipo_cliente } = req.body;

            if (!s_nome_cliente || !s_cpf_cliente) {
                throw new ValidationError("Name and CPF are required")
            }

            const newCliente = await clienteService.createCliente({
                s_nome_cliente,
                s_cpf_cliente,
                d_nasc_cliente,
                i_tipo_cliente
            })

            return res.status(201).json(newCliente)
        } catch (error) {
            next(error)
        }
    }

    async updateCliente(req, res) {
        const { id } = req.params;
        const { data } = req.body;
        try {
            if (!id) {
                throw new ValidationError("Missing ID parameter");
            }

            if (Object.keys(data).length === 0) {
                throw new NotFoundError("No data provided to update cliente")
            }

            const updatedCliente = await clienteService.updateCliente(Number(id), data);
            return res.status(200).json(updatedCliente)
        } catch (error) {
            next(error)
        }
    }

    async deleteCliente(req, res) {
        const { id } = req.params;

        try {
            if (!id) {
                throw new ValidationError("ID is required param to delete a cliente")
            }

            const deletedCliente = await clienteService.deleteCliente(Number(id));
            return res.status(200).json(deletedCliente)

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ClienteController();