import express from 'express'
import { cancelSeat } from '../../domain/services/cancelSeat.js';
export const servicesRouter = express.Router();

servicesRouter.post('/cancelarReserva', async (res, req) => {
})

servicesRouter.post('/cancelarCartelera', async (res, req) => {
})
