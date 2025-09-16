//Recebimento de requisições HTTP e devolução de respostas HTTP

const clienteService = require('@services/cliente.service');

class ClienteController {
    async getClienteById(req, res) {
        try {
            const { id } = req.params;
            const cliente = await clienteService.getClienteById(Number(id));

            if (!cliente) {
                return res.status(400).json({ error: "Cliente not founded" })
            }
            return res.status(200).json(cliente)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async getAllClientes(req, res) {
        try {
            const clientes = await clienteService.getAllClientes();
            return res.status(200).json(clientes)
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async createCliente(req, res) {
        try {
            const { s_nome_cliente, s_cpf_cliente, d_nasc_cliente, i_tipo_cliente } = req.body;

            if (!s_nome_cliente || !s_cpf_cliente) {
                return res.status(400).json({ message: "Name and CPF required!" })
            }

            const newCliente = await clienteService.createCliente({
                s_nome_cliente,
                s_cpf_cliente,
                d_nasc_cliente,
                i_tipo_cliente
            })

            return res.status(201).json(newCliente)
        } catch (error) {
            console.error("Error create cliente:", error.message)
            return res.status(500).json({ error: error.message })
        }
    }

    async updateCliente(req, res) {
        const { id } = req.params;
        const { data } = req.body;
        try {
            if (!id) {
                return res.status(400).json({ message: "Missing ID parameter" });
            }

            if (Object.keys(data).length === 0) {
                return res.status(400).json({ message: "No data founded to update cliente!" })
            }

            const updatedCliente = await clienteService.updateCliente(Number(id), data);
            return res.status(200).json(updatedCliente)
        } catch (error) {
            console.error("Error updating cliente", error.message);
            return res.status(500).json({error: error.message})
        }
    }

    async deleteCliente(req,res){
        const {id} = req.params;

        try{
            if(!id){
                return res.status(400).json({message: "ID is required param to delete a cliente"})
            }

            const deletedCliente = await clienteService.deleteCliente(Number(id));
            return res.status(200).json(deletedCliente)

        }catch(error){
            console.error("Error deleting cliente",error.message);
            return res.status(500).json({error:error.message})
        }
    }
}

module.exports = new ClienteController();