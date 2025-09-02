const prisma = require("../infra/prisma");

class VendaRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient
    }

    async findVendaById(id) {
        const venda = await this.prisma.venda.findFirst({
            where: {
                i_venda_venda: id,
                is_active: true
            },
            include: {
                cliente: {
                    select: {
                        i_cliente_cliente: true,
                        s_nome_cliente: true
                    }
                }

            }
        })
        return venda;
    }

    async findAll() {
        const venda = await this.prisma.venda.findMany({
            where: { is_active: true },
            include: {
                cliente: {
                    select: {
                        i_cliente_cliente: true,
                        s_nome_cliente: true
                    }
                }

            }
        })
        return venda;
    }

    async createVenda(data) {
        try {
            const newVenda = await this.prisma.venda.create({
                data: {
                    d_data_venda: data.d_data_venda ? new Date(data.d_data_venda) : null,
                    f_valor_venda: data.f_valor_venda,
                    i_cliente_cliente: data.i_cliente_cliente
                }
            })

            return newVenda;
        } catch (error) {
            console.error("Error create venda", error.message);
            throw new Error("Error on create venda on database")
        }
    };

    async updateVenda(id, data) {
        try {
            const updatedVenda = await this.prisma.venda.update({
                where: { i_venda_venda: id },
                data: {
                    ...data,
                    updated_at: new Date()
                }
            })

            return updatedVenda
        } catch (error) {
            console.error("Error updating venda in database", error.message);
            throw new Error("Database error on update venda")
        }
    }

    async deleteVenda(id) {
        try {
            const sofDeletedVenda = await this.prisma.venda.update({
                where: { i_venda_venda: id },
                data: {
                    is_active: false,
                    updated_at: new Date(),
                    deleted_at: new Date()
                }

            })

            return sofDeletedVenda;
        } catch (error) {
            console.error(`Error soft deleting venda on database ${error.message}`);
            throw new Error("Database error on soft delete venda")
        }
    }

}

module.exports = new VendaRepository(prisma)