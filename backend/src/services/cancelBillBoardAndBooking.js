import { sequelize } from "../database/config/database.js"
import { Billboard } from "../database/models/billboardEntity.js"
import { Booking } from "../database/models/bookingEntity.js"
import { Customer } from "../database/models/customerEntity.js"
import { Seat } from "../database/models/seatEntity.js"
import { Sequelize } from "sequelize"

export const cancelBillBoardAndBooking = async (billboardID) => {
    let transaction
    const today = new Date()
    try {
        transaction = await sequelize.transaction()
        const billboard = await Billboard.findByPk(billboardID, { transaction })

        if (!billboard) {
            throw new Error('No se encontró la cartelera especificada.');
        }
        if (billboard.date < today) throw new Error('No se puede eliminar una cartelera de una fecha anterior')

        const bookings = await Booking.findAll({
            where: {
                billboardID,
                transaction
            },
            include: [Customer]
        })

        console.log('Clientes Afectados', bookings.map(book => book.customerEntity.name))

        const seatIDs = bookings.map(book => book.seatID)

        await Seat.update({ status: true }, {
            where: { id: { [Sequelize.Op.in]: seatIDs } },
            transaction
        })

        await Booking.destroy({
            where: { billboardID },
            transaction
        });

        return 'Cartelera Cancelada'

    } catch (err) {
        if (transaction) await transaction.rollback()
        return { error: err }
    }

}