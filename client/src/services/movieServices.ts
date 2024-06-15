import axios from "axios";
import { Genre } from "../components/AdminCartelera";

const API = 'http://localhost:3002/api'

type newMovie = {
    name: string,
    genre: Genre,
    allowedAge: number,
    lengthMinutes: number
}


const createMovie = (newMovie: newMovie) => {
    const request = axios.post(`${API}/pelicula`, newMovie)
    return request.then(response => response.data)
}

export {
    createMovie
}