//Essa camada será responsável apenas pelo acesso aos dados, contendo toda a lógica do banco.

const prisma = require('../infra/prisma');

class ClienteRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient
    }
    async findClienteById(id) {
        const cliente = await this.prisma.cliente.findUnique({
            where:{i_cliente_cliente: id},
            include:{tipocliente: true}
        })
        return cliente;
    }

    async findAll(){
        const allClientes = await this.prisma.cliente.findMany({
            include:{tipocliente:true}
        });

        return allClientes;
    }
};

module.exports = new ClienteRepository(prisma)
