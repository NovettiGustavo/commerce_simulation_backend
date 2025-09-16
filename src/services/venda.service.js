const clienteRepository = require("@repositories/cliente.repository");
const vendaRepository = require("@repositories/venda.repository");
const VendaValidator = require("@validators/venda/venda_validator")


class vendaService {
    async getVendaById(id) {
        try {
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
        } catch (error) {
            console.error("Error in Venda Service:", error.message);
            throw new Error("Failed to get Venda by id");
        }

    }

    async getAllVendas() {
        try {
            const vendas = await vendaRepository.findAll();

            return vendas;
        } catch (error) {
            console.error("Error in Venda Service:", error.message);
            throw new Error("Failed to get all Venda");
        }

    }

    async createVenda(data) {
        try {
            const validatedData = VendaValidator.validadeCreate(data)
            const cliente = await clienteRepository.findClienteById(validatedData.i_cliente_cliente);
            if (!cliente) {
                throw new Error("Cliente not found!")
            }

            const newVenda = await vendaRepository.createVenda(validatedData)

            return newVenda;
        } catch (error) {
            console.error("Error createVenda on venda.service:", error.message);
            throw new Error(`Error createVenda on venda.service: ${error.message}`);
        }
    }

    async updateVenda(id, data) {
        try {

            const validatedData = await VendaValidator.validateUpdate(id, data)

            const updatedVenda = await vendaRepository.updateVenda(id, validatedData);
            return updatedVenda;


        } catch (error) {
            throw new Error(`Error on update venda in service: ${error.message}`)
        }
    };

    async deleteVenda(id) {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
        try {
            if (!id) {
                throw new Error("ID is required to delete venda")
            }

            const venda = await vendaRepository.findVendaById(id)

            VendaValidator.validateDelete(venda, oneYearAgo)

            const deletedVenda = await vendaRepository.deleteVenda(id);
            return deletedVenda;

        } catch (error) {
            console.error("Error on delete venda in service:", error.message);
            throw new Error(`Error on delete venda in service: ${error.message}`);
        }
    }
}

module.exports = new vendaService();