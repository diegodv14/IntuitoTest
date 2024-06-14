import express from 'express'
import { createBillboards, getBillboards } from '../controllers/BillboardController.js'
import { cancelBillBoardAndBooking } from '../services/cancelBillBoardAndBooking.js'
import { getAllSeats, getRooms } from '../controllers/BookingControllers.js'
export const billBoardRouter = express.Router()


billBoardRouter.get('/carteleras', async (req, res, next) => {
    getBillboards(req, res, next)
})

billBoardRouter.post('/carteleras', async (req, res, next) => {
    createBillboards(req, res, next)

})

billBoardRouter.get('/salas', async (req, res, next) => {
    getRooms(req, res, next)

})

billBoardRouter.get('/asientos', async (req, res, next) => {
    getAllSeats(req, res, next)
})

billBoardRouter.delete('/cartelera/:id', async (req, res, next) => {
    cancelBillBoardAndBooking(req, res, next)
})
