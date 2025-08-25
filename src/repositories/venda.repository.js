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

}

module.exports = new VendaRepository(prisma)