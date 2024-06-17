import express from 'express'
import { getHorrorReservations } from '../services/getHorrorReservations.js';
import { getSeats } from '../services/getSeats.js';
export const queriesRouter = express.Router();


queriesRouter.get('/reservaciones/Horror', async (req, res, next) => {
    await getHorrorReservations(req, res, next)

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