import express from 'express'
import { createCustomer, getCustomer } from '../controllers/CustomerController.js'
export const customerRouter = express.Router()

customerRouter.post('/cliente', (req, res, next) => {
    createCustomer(req, res, next)
})


customerRouter.get('/cliente/:ci', (req, res, next) => {
    getCustomer(req, res, next)
})