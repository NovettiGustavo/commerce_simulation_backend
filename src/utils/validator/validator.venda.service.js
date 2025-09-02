module.exports = {
    validateDataVendaForDelete(venda, oneYearAgo) {
        if (!venda) {
            throw new Error("Venda not found");
        }

        if (!venda.is_active) {
            throw new Error("venda is already deactivated")
        }

        if (!venda.d_data_venda) {
            throw new Error("Sale date is required for deletion")
        }
        if (venda.d_data_venda <= oneYearAgo) {
            throw new Error("Sales from one year ago cannot be excluded.")
        }

    }
}