import { sequelize } from "../database/config/database.js"
import { Billboard } from "../database/models/billboardEntity.js"
import { Booking } from "../database/models/bookingEntity.js"
import { Customer } from "../database/models/customerEntity.js"
import { Room } from "../database/models/roomEntity.js"
import { Seat } from "../database/models/seatEntity.js"
import { Sequelize } from "sequelize"
import { Movie } from "../database/models/movieEntity.js"

//Funcion para cancelar una cartelera y sus reservas

export const cancelBillBoardAndBooking = async (req, res, next) => {
    let transaction
    const today = new Date()

    try {
        const billboardID = req.params.id
        transaction = await sequelize.transaction()
        const billboard = await Billboard.findByPk(billboardID, { transaction })

        if (!billboard) {
            await transaction.rollback()
            res.json({ err: 'No se encontró la cartelera especificada.' });
        }

        const billboardDate = new Date(billboard.date)

        today.setUTCHours(0, 0, 0, 0);
        billboardDate.setUTCHours(0, 0, 0, 0);

        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDay = today.getDate();

        const billboardYear = billboardDate.getUTCFullYear();
        const billboardMonth = billboardDate.getUTCMonth();
        const billboardDay = billboardDate.getUTCDate();

        console.log(todayYear, todayMonth, todayDay, "Later", billboardYear, billboardMonth, billboardDay)

        if (billboardYear < todayYear ||
            (billboardYear === todayYear && billboardMonth < todayMonth) ||
            (billboardYear === todayYear && billboardMonth === todayMonth && billboardDay < todayDay)) {
            await transaction.rollback()
            return res.send(false)
        }

        const bookings = await Booking.findAll({
            where: {
                billboardID,
            },
            transaction,
            include: [Customer]
        })

        const CustomerAffected = bookings.map(book => book.Customer.name)

        const seatIDs = bookings.map(book => book.seatID)

        await Seat.update({ status: true }, {
            where: { id: { [Sequelize.Op.in]: seatIDs } },
            transaction
        })

        await Room.update({ status: true }, {
            where: {
                id: billboard.roomID
            }
        })

        await Booking.destroy({
            where: { billboardID },
            transaction
        });

        await Billboard.destroy({
            where: { id: billboardID },
            transaction
        });

        await Movie.destroy({
            where: { id: billboard.movieID },
            transaction
        })

        await transaction.commit()

        res.json('La cartelera fue cancelada y los clientes afectados son los siguientes: ' + CustomerAffected)

    } catch (err) {
        if (transaction) {
            try {
                await transaction.rollback()
            } catch (rollbackErr) {
                console.error('Error during transaction rollback:', rollbackErr)
            }
        } if (transaction) await transaction.rollback()
        next(err)
    }

}