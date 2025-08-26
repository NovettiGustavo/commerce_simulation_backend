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
    }
}

module.exports = new TipoClienteRepository(prisma)