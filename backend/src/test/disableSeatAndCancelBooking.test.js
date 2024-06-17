import { disableSeatAndCancelBooking } from '../services/disableSeatAndCancelBooking.js';
import { Seat } from '../database/models/seatEntity.js';
import { Booking } from '../database/models/bookingEntity.js';

// // Prueba unitaria para el servicio del punto 3 literal a

describe('Test Servicio 3 letra a ', () => {
    test('Desabilitar Butaca y cancelar reserva', async () => {
        const seatID = 1

        const bookingBefore = await Booking.findOne({
            include: [
                {
                    model: Seat,
                    where: {
                        id: seatID
                    }
                }
            ],
        })

        const response = await disableSeatAndCancelBooking(seatID)

        const seatLater = await Seat.findByPk(seatID)

        const wasDeleted = await Booking.findByPk(bookingBefore.id)

        expect(wasDeleted).toBe(null)
        expect(seatLater.status).toBeTruthy()
        expect(response.message).toStrictEqual('Reserva cancelada y butaca habilitada exitosamente.')
    })
    test('Buscar butaca que no existe', async () => {
        const seatID = 8

        const response = await disableSeatAndCancelBooking(seatID)

        expect(response.message).toStrictEqual('Butaca no encontrada.')

    })
    test('Tratar de despejar una butaca libre', async () => {
        const seatID = 4

        const response = await disableSeatAndCancelBooking(seatID)

        expect(response.message).toStrictEqual('Reserva no encontrada para la butaca especificada.')
    })
});

