import express from 'express'
import { createSeat, getAllSeats } from '../controllers/SeatControllers.js'

export const seatsRouter = express.Router()


seatsRouter.get('/asientos', async (req, res, next) => {
    getAllSeats(req, res, next)
})

seatsRouter.post('/asientos', async (req, res, next) => {
    createSeat(req, res, next)
})