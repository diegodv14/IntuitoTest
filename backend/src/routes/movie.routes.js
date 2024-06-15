import express from 'express'
import { createMovie } from '../controllers/MovieController.js'
export const movieRouter = express.Router()


movieRouter.post('/pelicula', (req, res, next) => {
    createMovie(req, res, next)
})
