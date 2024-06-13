import express from 'express'
import { getTerrorReservations } from '../../domain/queries/getTerrorReservations.js';
import { getSeats } from '../../domain/queries/getSeats.js';
export const queriesRouter = express.Router();


queriesRouter.get('/reservasTerror', async (req, res) => {
    try {
        const { startTime, endTime } = req.body
        const reservasTerror = await getTerrorReservations(startTime, endTime)
        res.json(reservasTerror)
    } catch (err) {
        res.json({ error: err })
    }
})

queriesRouter.get('/butacasPerCartelera', async (req, res) => {
    try {
        const seats = await getSeats()
        res.json(seats)
    }
    catch (err) {
        res.json(err)
    }

})