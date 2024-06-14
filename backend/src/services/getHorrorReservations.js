import { Booking } from "../database/models/bookingEntity.js";
import { Billboard } from "../database/models/billboardEntity.js";
import { Movie } from "../database/models/movieEntity.js";
import { Customer } from "../database/models/customerEntity.js";


export const getHorrorReservations = async (startTime, endTime) => {
    try {
        const reservations = await Booking.findAll({
            include: [
                {
                    model: Billboard,
                    // include: [
                    //     {
                    //         model: Movie,
                    //         as: 'Movie',
                    //         where: { genre: 'HORROR' }
                    //     },
                    // ],
                },
            ],
            where: {
                '$Billboard.startTime$': {
                    [Op.between]: [startTime, endTime]
                },
            },
        })
        return reservations
    } catch (err) {
        throw new Error(`No se puedo determinar las reservas de peliculas de terror entre ${startTime} y ${endTime}`)
    }
} 