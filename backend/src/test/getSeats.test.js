import supertest from 'supertest'
import { app } from '../app.js'
import { jest } from '@jest/globals';
import { formatDateToDDMMYYYY } from '../services/getSeats.js';
import { Billboard } from '../database/models/billboardEntity.js';
import { Seat } from '../database/models/seatEntity.js';
import { Sequelize } from 'sequelize';

const api = supertest(app)
jest.setTimeout(70 * 2000)

//Prueba de integración para el query del punto 2 literal b

describe('Test query B', () => {
    test('Obtener butacas libres y ocupadas en la cartelera actual', async () => {
        const today = formatDateToDDMMYYYY(new Date())

        const BillboardsToday = await Billboard.findAll({
            where: {
                date: today
            },
        })

        const roomsID = BillboardsToday.map(billboard => billboard.roomID)

        const SeatsAvalialableInTodayRooms = await Seat.count({
            where: {
                roomID: { [Sequelize.Op.in]: roomsID },
                status: true
            },
            group: ['roomID']
        })

        const SeatBusyInTodayRooms = await Seat.count({
            where: {
                roomID: { [Sequelize.Op.in]: roomsID },
                status: false
            },
            group: ['roomID']
        })

        const response = await api.get('/api/asientos/porSala')

        expect(response.body).toStrictEqual({
            SeatsAvalialableInTodayRooms,
            SeatBusyInTodayRooms
        })

    })
})
