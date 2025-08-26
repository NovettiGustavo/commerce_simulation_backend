const vendaRepository = require("../repositories/venda.repository");

class vendaService{
    async getVendaById(id){
        if(!id){
            throw new Error("Missign id");
        }

        const venda = await vendaRepository.findVendaById(id);

        if(!venda){
            throw new Error("Venda not founded!");
        }

        if(!venda.cliente){
            throw new Error("Venda does not have an associated cliente")
        }

        return venda;
    }

    async getAllVendas(){
        const vendas = await vendaRepository.findAll();

        return vendas;
    }
}

module.exports = new vendaService();