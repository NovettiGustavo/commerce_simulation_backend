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

    async createCliente(data){
        try{
            const newCliente = await this.prisma.cliente.create({
                data:{
                    s_nome_cliente: data.s_nome_cliente,
                    s_cpf_cliente: data.s_cpf_cliente,
                    d_nasc_cliente: data.d_nasc_cliente,
                    i_tipo_cliente: data.i_tipo_cliente
                }
            })
            return newCliente
        }catch(error){
            console.error("Error create customer",error.message);
            throw new Error("Database error on createCliente")
        }
    }
};

module.exports = new ClienteRepository(prisma)
