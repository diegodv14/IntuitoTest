import express from 'express'
import { createBillboard, getBillboards } from '../controllers/BillboardController.js'
import { cancelBillBoardAndBooking } from '../services/cancelBillBoardAndBooking.js'
export const billBoardRouter = express.Router()


billBoardRouter.get('/carteleras', async (req, res, next) => {
    getBillboards(req, res, next)
})

billBoardRouter.post('/carteleras', async (req, res, next) => {
    createBillboard(req, res, next)

})

billBoardRouter.delete('/cartelera/:id', async (req, res, next) => {
    cancelBillBoardAndBooking(req, res, next)
})
