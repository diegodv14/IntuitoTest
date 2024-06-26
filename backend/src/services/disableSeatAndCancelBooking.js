import { sequelize } from "../database/config/database.js"
import { Seat } from "../database/models/seatEntity.js"
import { Booking } from "../database/models/bookingEntity.js"


//Servicio de despejar una butaca y cancelar su reserva

export const disableSeatAndCancelBooking = async (seatID) => {
    let transaction
    try {
        transaction = await sequelize.transaction()

        const seat = await Seat.findByPk(seatID,
            {
                transaction
            });

        if (!seat) {
            await transaction.rollback();
            return { message: 'Butaca no encontrada.' };
        }

        const booking = await Booking.findOne({
            include: [
                {
                    model: Seat,
                    where: {
                        id: seat.dataValues.id
                    }
                }
            ],
            transaction
        })

        if (!booking) {
            await transaction.rollback();
            return { message: 'Reserva no encontrada para la butaca especificada.' };
        }
        await Booking.destroy({
            where: {
                id: booking.id
            },
            transaction
        });

        await Seat.update({ status: true }, {
            where: {
                id: seat.id
            },
            transaction
        })

        await transaction.commit()
        return { message: 'Reserva cancelada y butaca habilitada exitosamente.' };

    } catch (err) {
        if (transaction) await transaction.rollback();
    }
}