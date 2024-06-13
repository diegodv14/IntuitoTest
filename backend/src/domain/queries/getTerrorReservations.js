import { bookingEntity } from "../entities/bookingEntity.js";
import { billboardEntity } from "../entities/billboardEntity.js";
import { movieEntity } from "../entities/movieEntity.js";
import { customerEntity } from "../entities/customerEntity.js";
import { Op } from "sequelize";


export const getTerrorReservations = async (startDate, endDate) => {
    try {
        const reservations = await bookingEntity.findAll({
            include: [
                {
                    model: customerEntity,
                    as: 'Customer'
                },
                {
                    model: billboardEntity,
                    as: 'Billboard',
                    include: [
                        {
                            model: movieEntity,
                            as: 'Movie',
                            where: { genre: 'HORROR' }
                        },
                    ],
                },
            ],
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                },
            },
        })
        return reservations
    } catch (err) {
        throw new Error(`No se puedo determinar las reservas de peliculas de terror entre ${startDate} y ${endDate}`)
    }
} 