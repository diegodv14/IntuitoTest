import { sequelize } from "../../infraestructure/config/database.js"
import { seatEntity } from "../entities/seatEntity.js"

export const cancelSeat = async (seatID) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        await seatEntity.update(
            { status: false },
            {
                where: { id: seatID },
                transaction,
            }
        );

        await transaction.commit()

        return { message: 'Reserva cancelada y butaca inhabilitada exitosamente.' };
    } catch (err) {
        if (transaction) await transaction.rollback();
        return { message: "Hubo problemas para cancelar la reserva" }
    }
}