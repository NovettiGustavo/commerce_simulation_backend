const prisma = require("../infra/prisma");

class VendaRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient
    }

    async findVendaById(id){
        const venda = await this.prisma.venda.findUnique({
            where:{i_venda_venda: id},
            include:{
                cliente:{
                    select:{
                        i_cliente_cliente:true,
                        s_nome_cliente:true
                    }
                }

            }
        })
        return venda;
    }

    async findAll(){
        const venda = await this.prisma.venda.findMany({
            include:{
                cliente:{
                    select:{
                        i_cliente_cliente:true,
                        s_nome_cliente:true
                    }
                }

            }
        })
        return venda;
    }

    async createVenda(data){
        try{
            const newVenda = await this.prisma.venda.create({
                data:{
                    d_data_venda: data.d_data_venda ? new Date(data.d_data_venda) : null,
                    f_valor_venda: data.f_valor_venda,
                    i_cliente_cliente: data.i_cliente_cliente
                }
            })

            return newVenda;
        }catch(error){
            console.error("Error create venda", error.message);
            throw new Error("Error on create venda on database")
        }
    };

    async updateVenda(id, data){
        try{
            const updatedVenda = await this.prisma.venda.update({
                where: {i_venda_venda: id},
                data:{...data}
            })

            return updatedVenda
        }catch(error){
            console.error("Error updating venda in database", error.message);
            throw new Error("Database error on update venda")
        }
    }

}

module.exports = new VendaRepository(prisma)