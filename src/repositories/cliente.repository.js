//Essa camada será responsável apenas pelo acesso aos dados, contendo toda a lógica do banco.

const prisma = require('../infra/prisma');

class ClienteRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient
    }
    async findClienteById(id) {
        const cliente = await this.prisma.cliente.findFirst({
            where:{i_cliente_cliente: id,
                is_active:true
            },
            include:{tipocliente: true}
        })
        return cliente;
    }

    async findAll(){
        const allClientes = await this.prisma.cliente.findMany({
            where:{is_active:true},
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
                    d_nasc_cliente: data.d_nasc_cliente ? new Date(data.d_nasc_cliente) : null,
                    i_tipo_cliente: data.i_tipo_cliente,
                }
            })
            return newCliente
        }catch(error){
            console.error("Error create customer",error.message);
            throw new Error("Database error on createCliente")
        }
    };

    async updateCliente(id, data){
        try{
            const updateCliente = await this.prisma.cliente.update({
                where:{i_cliente_cliente:id},
                data:{...data,
                    updated_at:new Date()
                }
            })

            return updateCliente;
        }catch(error){
            console.error("Error updating cliente in database", error.message);
            throw new Error("Database error on update cliente");
        }
    };

    async deleteCliente(id){
        try{
            const softDeletedCliente = await this.prisma.cliente.update({
                where:{
                    i_cliente_cliente: id
                },
                data:{
                    is_active:false,
                    deleted_at:new Date(),
                    updated_at: new Date()
                }
            })

            return softDeletedCliente;
        }catch(error){
            console.error(`Error soft deleting cliente on database ${error.message}`);
            throw new Error("Database error on soft delete cliente")
        }
    }
};

module.exports = new ClienteRepository(prisma)
