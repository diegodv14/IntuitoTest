import { sequelize } from "../../infraestructure/config/database"

export const cancelBillBoard = async (billboardID) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
    } catch (err) {

    }

}