const tipoClienteService = require("@services/tipoCliente.service");
const { ValidationError, NotFoundError } = require("@errors")

class TipoClienteController {
    async getTipoClienteById(req, res) {
        try {
            const { id } = req.params;
            const tipoCliente = await tipoClienteService.getTipoClienteById(Number(id));

            if (!tipoCliente) {
                throw new NotFoundError("tipocliente not found!");
            }

            return res.status(200).json(tipoCliente);
        } catch (error) {
            next(error);
        }
    };

    async getAllTipoCliente(req, res) {
        try {
            const tipoClientes = await tipoClienteService.getAllTipoClientes();

            if (tipoClientes.length === 0) {
                throw new NotFoundError("tipoclientes not found!");
            }

            return res.status(200).json(tipoClientes)
        } catch (error) {
            next(error);
        }

    };

    async createTipoCliente(req, res) {
        const { s_dsctipocliente_tipocliente } = req.body;

        try {
            if (!s_dsctipocliente_tipocliente) {
                throw new ValidationError("Description is required");
            }

            const newTipoCliente = await tipoClienteService.createTipoCliente({
                s_dsctipocliente_tipocliente
            })

            return res.status(201).json(newTipoCliente)
        } catch (error) {
            next(error);
        }
    };

    async updateTipoCliente(req, res) {
        const { id } = req.params;
        const { data } = req.body;

        try {
            if (!id) {
                throw new ValidationError("Missing ID parameter");
            }

            if (!data || Object.keys(data).length === 0) {
                throw new ValidationError("No data founded to update tipocliente");
            }

            const updatedTipoCliente = await tipoClienteService.updateTipoCliente(Number(id), data);
            return res.status(200).json(updatedTipoCliente)
        } catch (error) {
            next(error);
        }
    };

    async deleteTipoCliente(req, res) {
        const { id } = req.params;

        try {
            if (!id) throw new ValidationError("ID is required param to delete a tipocliente");

            const deletedTipoCliente = await tipoClienteService.deleteTipoCliente(id);
            return res.status(200).json(deletedTipoCliente)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TipoClienteController()
