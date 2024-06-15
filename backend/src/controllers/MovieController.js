import { Movie } from "../database/models/movieEntity.js"

export const createMovie = async (req, res, next) => {
    try {
        const movieInfo = {
            name: req.body.name,
            genre: req.body.genre,
            allowedAge: Number(req.body.allowedAge),
            lengthMinutes: Number(req.body.lengthMinutes)
        }
        const createdMovie = await Movie.create(movieInfo)
        if (!createdMovie) res.json('Hubo un problema creando la pelicula.')
        res.json(createdMovie)
    } catch (err) {
        next(err)
    }
}