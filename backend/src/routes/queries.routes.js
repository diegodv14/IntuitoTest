import express from 'express'
import { getHorrorReservations } from '../services/getHorrorReservations.js';
import { getSeats } from '../services/getSeats.js';
export const queriesRouter = express.Router();


queriesRouter.post('/reservas/Horror', async (req, res, next) => {
    try {
        const { startTime, endTime } = req.body
        const reservasTerror = await getHorrorReservations(startTime, endTime)
        res.json(reservasTerror)
    } catch (err) {
        next(err)
    }
})

queriesRouter.get('/asientos/porSala', async (req, res, next) => {
    try {
        const seats = await getSeats()
        res.json(seats)
    }
    catch (err) {
        next(err)
    }

})