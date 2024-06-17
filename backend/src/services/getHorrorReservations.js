import { Booking } from "../database/models/bookingEntity.js";
import { Billboard } from "../database/models/billboardEntity.js";
import { Movie } from "../database/models/movieEntity.js";
import { Op } from "sequelize";



//query para obtener las reservaciones de peliculas de horror entre fechas. Solicitud GET Ejemplo de url: http://127.0.0.1:3002/api/reservaciones/Horror?startDate=2024-06-20&endDate=2024-06-30

export const getHorrorReservations = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.json('Se requieren fecha de inicio y fecha de fin.');
        }

        const reservationsOfHorrorMovies = await Booking.findAll({
            include: [
                {
                    model: Billboard,
                    required: true,
                    include: [
                        {
                            model: Movie,
                            where: {
                                genre: 'HORROR'
                            }
                        }
                    ]
                },
            ],
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        res.send(reservationsOfHorrorMovies);
    } catch (err) {
        next(err);
    }
};
