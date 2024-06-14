import express from 'express'
import { getBookings } from '../controllers/BookingControllers.js'
export const bookingRouter = express.Router()


bookingRouter.get('/reservaciones', async (req, res, next) => {
    getBookings(req, res, next)
})