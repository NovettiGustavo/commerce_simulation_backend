const vendaService = require("../services/venda.service")

class VendaController {
    async getVendaById(req, res) {
        try {
            const { id } = req.params;
            const venda = await vendaService.getVendaById(Number(id));

            if (!venda) {
                return res.status(404).json({ message: "Venda not founded" });
            }

            return res.status(200).json(venda)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async getAllVendas(req, res) {
        try {
            const vendas = await vendaService.getAllVendas();

            if (vendas.length === 0) {
                return res.status(404).json({ message: "Vendas not founded" })
            }

            return res.status(200).json(vendas)

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async createVenda(req, res) {
        
        try {
            const { d_data_venda, f_valor_venda, i_cliente_cliente } = req.body;

            if(!d_data_venda || !f_valor_venda || !i_cliente_cliente){
                return res.status(400).json({message: "Missing required fields on create Venda!"});
            }

            const newVenda = await vendaService.createVenda({
                d_data_venda,
                f_valor_venda,
                i_cliente_cliente
            })

            return res.status(201).json(newVenda);
        }catch(error){
            console.error("Error on HTTP method to create venda:", error.message);
            return res.status(500).json({error:error.message})
        }
    }

    async updateVenda(req,res){
        const {id} = req.params;
        const {data} = req.body;

        try{
            if(!id){
                return res.status(400).json({message:"Missing ID parameter"})
            }

            if(!data || Object.keys(data).length === 0){
                return res.status(400).json({message: "No data founded to update venda"})
            }

            const updatedVenda = await vendaService.updateVenda(Number(id),data);
            return res.status(200).json(updatedVenda)

        }catch(error){
            console.error(`Error on update venda in controller:${error.message}`);
            return res.status(500).json({message:"Internal server error"})
        }
    }
}

module.exports = new VendaController()