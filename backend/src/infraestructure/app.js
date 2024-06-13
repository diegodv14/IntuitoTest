import express from 'express'
import { servicesRouter } from '../adapters/routes/services.routes.js'
import { queriesRouter } from '../adapters/routes/queries.routes.js'
import cors from 'cors'
import { errorHandler } from './middlewares/customErrorHandler.js'


export const app = express()


app.use(express.json())

app.use(cors())

app.use('/api/services', servicesRouter)

app.use('/api/queries', queriesRouter)

app.use(errorHandler)