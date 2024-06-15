import express from 'express'
import { createBooking, getBookings } from '../controllers/BookingControllers.js'
export const bookingRouter = express.Router()


bookingRouter.get('/reservaciones', async (req, res, next) => {
    getBookings(req, res, next)
})


bookingRouter.post('/reservaciones', async (req, res, next) => {
    createBooking(req, res, next)
})