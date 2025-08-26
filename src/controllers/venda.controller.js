const vendaService = require("../services/venda.service")

class VendaController{
    async getVendaById(req,res){
        try{
            const {id} = req.params;
            const venda = await vendaService.getVendaById(Number(id));

            if(!venda){
                return res.status(404).json({message:"Venda not founded"});
            }

            return res.status(200).json(venda)
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }

    async getAllVendas(res){
        try{
            const vendas = await vendaService.getAllVendas();
            
            if(vendas.length === 0){
                return res.status(404).json({message: "Vendas not founded"})
            }

            return res.status(200).json(vendas)

        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }
}

module.exports = new VendaController()