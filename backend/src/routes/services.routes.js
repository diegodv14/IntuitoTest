import express from 'express'
import { disableSeatAndCancelBooking } from '../services/disableSeatAndCancelBooking.js'
import { cancelBillBoardAndBooking } from '../services/cancelBillBoardAndBooking.js';
export const servicesRouter = express.Router();

servicesRouter.post('reserva/:bookingID/cancelar', async (req, res, next) => {
    try {
        const { bookingID } = req.params
        res.json(disableSeatAndCancelBooking(bookingID))
    } catch (err) {
        next(err)
    }
})

servicesRouter.post('cartelera/:billboardID/cancelar', async (req, res, next) => {
    try {
        const { billboardID } = req.params
        res.json(cancelBillBoardAndBooking(billboardID))
    }
    catch (err) {
        next(err)
    }
})

servicesRouter.get('/', (req, res) => {
    res.json("Hola")
})
