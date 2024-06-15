import express from 'express'
import { servicesRouter } from './routes/services.routes.js'
import { queriesRouter } from './routes/queries.routes.js'
import cors from 'cors'
import { errorHandler } from './middlewares/customErrorHandler.js'
import { billBoardRouter } from './routes/billboard.routes.js'
import { bookingRouter } from './routes/booking.routes.js'
import { seatsRouter } from './routes/seats.routes.js'
import { customerRouter } from './routes/customer.routes.js'
import { movieRouter } from './routes/movie.routes.js'
import { roomRouter } from './routes/room.routes.js'


export const app = express()


app.use(express.json())

app.use(cors())

app.use('/api', billBoardRouter)

app.use('/api', servicesRouter)

app.use('/api', queriesRouter)

app.use('/api', customerRouter)

app.use('/api', seatsRouter)

app.use('/api', bookingRouter)

app.use('/api', movieRouter)

app.use('/api', roomRouter)

app.use(errorHandler)