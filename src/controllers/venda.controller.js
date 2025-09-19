const vendaService = require("@services/venda.service")
const { ValidationError, NotFoundError } = require("@errors");

class VendaController {
    async getVendaById(req, res) {
        try {
            const { id } = req.params;
            const venda = await vendaService.getVendaById(Number(id));

            if (!venda) {
                throw new NotFoundError("Venda not founded");
            }

            return res.status(200).json(venda)
        } catch (error) {
            next(error);
        }
    }

    async getAllVendas(req, res) {
        try {
            const vendas = await vendaService.getAllVendas();

            if (vendas.length === 0) {
                throw new NotFoundError("Vendas not founded");
            }

            return res.status(200).json(vendas)

        } catch (error) {
            next(error);
        }
    }

    async createVenda(req, res) {

        try {
            const { d_data_venda, f_valor_venda, i_cliente_cliente } = req.body;

            if (!d_data_venda || !f_valor_venda || !i_cliente_cliente) {
                throw new ValidationError("Missing required fields on create Venda!");
            }

            const newVenda = await vendaService.createVenda({
                d_data_venda,
                f_valor_venda,
                i_cliente_cliente
            })

            return res.status(201).json(newVenda);
        } catch (error) {
            next(error);
        }
    }

    async updateVenda(req, res) {
        const { id } = req.params;
        const { data } = req.body;

        try {
            if (!id) {
                throw new ValidationError("Missing ID parameter")
            }

            if (!data || Object.keys(data).length === 0) {
                throw new ValidationError("No data founded to update venda")
            }

            const updatedVenda = await vendaService.updateVenda(Number(id), data);
            return res.status(200).json(updatedVenda)

        } catch (error) {
            next(error);
        }
    };

    async deleteVenda(req, res) {
        const { id } = req.params

        try {
            if (!id) throw new ValidationError("ID is required param to delete a sale");

            const deletedVenda = await vendaService.deleteVenda(id);
            return res.status(200).json(deletedVenda)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new VendaController()