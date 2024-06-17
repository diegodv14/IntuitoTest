import supertest from 'supertest'
import { app } from '../app.js'
import { jest } from '@jest/globals';
import { Booking } from '../database/models/bookingEntity.js';
import { Customer } from '../database/models/customerEntity.js';
import { Billboard } from '../database/models/billboardEntity.js';


const api = supertest(app)
jest.setTimeout(70 * 2000)

//Prueba de integración para el endpoint del punto 4 literal b2. 

//Las pruebas subsiguientes funcionan con los datos de prueba que se crean en server.js al iniciar el servidor
//Script del test: set NODE_OPTIONS=--experimental-vm-modules && npm test


describe('Test Service A endpoint', () => {
    test('Do the cancel', async () => {
        const billboardID = 2

        const bookings = await Booking.findAll({
            where: {
                billboardID,
            },
            include: [Customer]
        })

        const CustomerAffected = bookings.map(book => book.Customer.name)

        const response = await api.delete(`/api/carteleras/${billboardID}`)

        const wasDeleted = await Billboard.findByPk(billboardID)

        expect(wasDeleted).toBe(null)
        expect(response.body.message).toBe('La cartelera fue cancelada y los clientes afectados son los siguientes: ')
        expect(response.body.CustomerAffected).toStrictEqual(CustomerAffected)

    })
    test('Don\'t cancel Billboard with passed Date', async () => {

        const billboardID = 3
        const response = await api.delete(`/api/carteleras/${billboardID}`)

        expect(response.body).toBe(false)
    })
    test('Try to cancel billboard which doesn\'t exists ', async () => {

        const billboardID = 5
        const response = await api.delete(`/api/carteleras/${billboardID}`)

        expect(response.body.err).toBe('No se encontró la cartelera especificada.')
    })
})