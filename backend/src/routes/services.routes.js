import express from 'express'
import { disableSeatAndCancelBooking } from '../services/disableSeatAndCancelBooking.js'
import { cancelBillBoardAndBooking } from '../services/cancelBillBoardAndBooking.js';
export const servicesRouter = express.Router();

servicesRouter.delete('/asientos/:id', async (req, res, next) => {
    disableSeatAndCancelBooking(req, res, next)
})

servicesRouter.delete('/carteleras/:id', async (req, res, next) => {
    cancelBillBoardAndBooking(req, res, next)
})

