const clienteRepository = require("../repositories/cliente.repository");
const vendaRepository = require("../repositories/venda.repository");

class VendaValidator {
    static validateDelete(venda, oneYearAgo) {
        if (!venda) {
            throw new Error("Venda not found");
        }

        if (!venda.is_active) {
            throw new Error("venda is already deactivated")
        }

        if (!venda.d_data_venda) {
            throw new Error("Sale date is required for deletion")
        }
        if (venda.d_data_venda <= oneYearAgo) {
            throw new Error("Sales from one year ago cannot be excluded.")
        }

        return venda;
    };

    static validadeCreate(data) {
        const { d_data_venda, f_valor_venda, i_cliente_cliente } = data;

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

        return {
            ...data,
            f_valor_venda: valorVenda
        }
    }

    static async validateUpdate(id, data) {
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
        return data;
    }
}

module.exports = VendaValidator;



/* validateDataVendaForDelete(venda, oneYearAgo) {
        if (!venda) {
            throw new Error("Venda not found");
        }

        if (!venda.is_active) {
            throw new Error("venda is already deactivated")
        }

        if (!venda.d_data_venda) {
            throw new Error("Sale date is required for deletion")
        }
        if (venda.d_data_venda <= oneYearAgo) {
            throw new Error("Sales from one year ago cannot be excluded.")
        }

    }*/