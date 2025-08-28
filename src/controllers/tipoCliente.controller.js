const tipoClienteService = require("../services/tipoCliente.service");

class TipoClienteController {
    async getTipoClienteById(req, res) {
        try {
            const { id } = req.params;
            const tipoCliente = await tipoClienteService.getTipoClienteById(Number(id));

            if (!tipoCliente) {
                return res.status(404).json({ message: "tipocliente not found!" });
            }

            return res.status(200).json(tipoCliente);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    async getAllTipoCliente(req, res) {
        try {
            const tipoClientes = await tipoClienteService.getAllTipoClientes();

            if (tipoClientes.length === 0) {
                return res.status(404).json({ message: "tipoClientes not found!" });
            }

            return res.status(200).json(tipoClientes)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }

    };

    async createTipoCliente(req,res){
        const {s_dsctipocliente_tipocliente} = req.body;

        try{
            if(!s_dsctipocliente_tipocliente){
                return res.status(400).json({message:"Description is required"})
            }

            const newTipoCliente = await tipoClienteService.createTipoCliente({
                s_dsctipocliente_tipocliente
            })

            return res.status(201).json(newTipoCliente)
        }catch(error){
            console.error("Internal server error on create tipocliente",error.message);
            return res.status(500).json({message: error.message})
        }
    };

    async updateTipoCliente(req, res){
        const {id} = req.params;
        const {data} = req.body;

        try{
            if(!id){
                res.status(400).json({message: "Missing ID parameter"});
            }

            if(!data || Object.keys(data).length === 0){
                return res.status(400).json({message: "No data founded to update tipocliente"});
            }

            const updatedTipoCliente = await tipoClienteService.updateTipoCliente(Number(id),data);
            return res.status(200).json(updatedTipoCliente)
        }catch(error){
            console.error(`Error on update tipocliente in controller: ${error.message}`);
            return res.status(500).json({message:"Internal server error"});
        }
    }
}

module.exports = new TipoClienteController()
