const clienteRepository = require("../repositories/cliente.repository");
const vendaRepository = require("../repositories/venda.repository");

class vendaService {
    async getVendaById(id) {
        if (!id) {
            throw new Error("Missign id");
        }

        const venda = await vendaRepository.findVendaById(id);

        if (!venda) {
            throw new Error("Venda not founded!");
        }

        if (!venda.cliente) {
            throw new Error("Venda does not have an associated cliente")
        }

        return venda;
    }

    async getAllVendas() {
        const vendas = await vendaRepository.findAll();

        return vendas;
    }

    async createVenda(data) {
        const { d_data_venda, f_valor_venda, i_cliente_cliente } = data;

        try {
            if (!d_data_venda || !f_valor_venda) {
                throw new Error("Missing required fields")
            }

            if (!i_cliente_cliente) {
                throw new Error("A sale can only be created associated with an customer")
            }

            const valorVenda = Number(f_valor_venda);
            if (isNaN(valorVenda)) {
                throw new Error("Sales value must be a valid number");
            }

            if (isNaN(new Date(d_data_venda).getDate())) {
                throw new Error("Sale date invalid!");
            }

            const cliente = await clienteRepository.findClienteById(i_cliente_cliente);
            if (!cliente) {
                throw new Error("Cliente not found!")
            }

            const newVenda = await vendaRepository.createVenda({
                ...data,
                f_valor_venda: valorVenda
            })

            return newVenda;
        } catch (error) {
            throw new Error("Error createVenda on venda.service", error.message)
        }
    }

    async updateVenda(id, data) {
        try {
            if (!id) {
                throw new Error("ID is required param to update venda")
            }

            const vendaExist = await vendaRepository.findVendaById(id);
            if (!vendaExist) {
                throw new Error("Venda not found")
            }

            if (data.i_cliente_cliente) {
                const clienteExist = await clienteRepository.findClienteById(data.i_cliente_cliente);
                if (!clienteExist) {
                    throw new Error("Cliente not found")
                }
            }

            if (data.d_data_venda) {
                const parsedDate = new Date(data.d_data_venda);

                if (isNaN(parsedDate.getDate())) {
                    throw new Error("Expected ISO-8601 DateTime format")
                }

                data.d_data_venda = parsedDate;
            }

            const updatedVenda = await vendaRepository.updateVenda(id, data);
            return updatedVenda;


        } catch (error) {
            throw new Error(`Error on update venda in service: ${error.message}`)
        }
    }
}

module.exports = new vendaService();