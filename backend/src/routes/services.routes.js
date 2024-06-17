import express from 'express'
import { disableSeatAndCancelBooking } from '../services/disableSeatAndCancelBooking.js'
import { cancelBillBoardAndBooking } from '../services/cancelBillBoardAndBooking.js';
export const servicesRouter = express.Router();

servicesRouter.delete('/asientos/:id', async (req, res, next) => {
    try {
        const response = disableSeatAndCancelBooking(req.params.id)
        res.json(response)

    } catch (err) {
        next(err)
    }
})

servicesRouter.delete('/carteleras/:id', async (req, res, next) => {
    cancelBillBoardAndBooking(req, res, next)
})

