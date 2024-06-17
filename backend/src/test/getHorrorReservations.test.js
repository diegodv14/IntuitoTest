import supertest from 'supertest'
import { app } from '../app.js'
import { jest } from '@jest/globals';
import { Booking } from '../database/models/bookingEntity.js';
import { Billboard } from '../database/models/billboardEntity.js';
import { Movie } from '../database/models/movieEntity.js';
import { Op } from 'sequelize';

const api = supertest(app)
jest.setTimeout(70 * 2000)

//Prueba de integración para el query del punto 2 literal a

describe('Test Query a', () => {
    test('Obtener reservas de terror en un rango de fechas', async () => {
        const BetweenDates = ['2024-06-10', '2024-06-18']

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
                    [Op.between]: [BetweenDates[0], BetweenDates[1]]
                }
            }
        });
        const response = await api.get(`/api/reservaciones/Horror?startDate=${BetweenDates[0]}&endDate=${BetweenDates[1]}`)
        expect(response.body).toStrictEqual(reservationsOfHorrorMovies)
    })
    test('No hay fechas para comparar', async () => {
        const response = await api.get('/api/reservaciones/Horror')
        expect(response.body).toStrictEqual('Se requieren fecha de inicio y fecha de fin.')
    })
})
