import { sequelize } from "../database/config/database.js"
import { Seat } from "../database/models/seatEntity.js"
import { Booking } from "../database/models/bookingEntity.js"

export const disableSeatAndCancelBooking = async (bookingID) => {
    let transaction
    try {
        transaction = await sequelize.transaction()
        const booking = await Booking.findByPk(bookingID, { transaction });
        if (!booking) throw new Error('Reserva no encontrada');

        await Seat.update({ status: false }, {
            where: { id: booking.seatID },
            transaction
        });

        await Booking.destroy({
            where: { id: bookingID },
            transaction
        });

        await transaction.commit()
        return { message: 'Reserva cancelada y butaca inhabilitada exitosamente.' };

    } catch (err) {
        if (transaction) await transaction.rollback();
        return { message: "Hubo problemas para cancelar la reserva" }
    }
}