const prisma = require("../infra/prisma");

class TipoClienteRepository{
    constructor(prismaClient){
        this.prisma = prismaClient
    }

    async findTipoClienteById(id){
        const tipoCliente = await this.prisma.tipocliente.findUnique({
            where:{i_tipocliente_tipocliente: id},
            include:{
                cliente:{
                    select:{
                        s_nome_cliente:true,
                        s_cpf_cliente:true
                    }
                }
            }
        })
        return tipoCliente;
    };

    async findAll(){
        const tipoClientes = await this.prisma.tipocliente.findMany({
            include:{
                cliente:{
                    select:{
                        s_nome_cliente:true,
                        s_cpf_cliente:true
                    }
                }
            }
        })

        return tipoClientes;
    };

    async createTipoCliente(data){
        try{
            const newTipoCliente = await this.prisma.tipocliente.create({
                data:{
                    s_dsctipocliente_tipocliente: data.s_dsctipocliente_tipocliente
                }
            })

            return newTipoCliente;
        }catch(error){
            console.error("Error create new tipoCliente", error.message);
            throw new Error("Database error on create tipoCliente");
        }
    }

    async updateTipoCliente(id,data){
        try{
            const updatedTipoCliente = await this.prisma.tipocliente.update({
                where:{i_tipocliente_tipocliente: id},
                data:{...data}
            });

            return updatedTipoCliente;

        }catch(error){
            console.error(`Error updating tipocliente in database ${error.message}`);
            throw new Error("Database error on update tipocliente")
        }
    };

    async deleteTipoCliente(id){
        try{
            const deletedTipoCliente = await this.prisma.tipocliente.delete({
                where:{
                    i_tipocliente_tipocliente:id
                }
            })

            return deletedTipoCliente;
        }catch(error){
            console.error(`Error soft deleting tipocliente on database ${error.message}`);
            throw new Error("Database error on soft delete tipocliente")
        }
    }
}

module.exports = new TipoClienteRepository(prisma)