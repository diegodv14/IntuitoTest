import axios from "axios"

const API = "http://localhost:3002/api"


const getSeats = () => {
    const response = axios.get(`${API}/butacas/disponibles`)
    return response.then(response => response.data)
}

const getHorrorBookings = (startTime: string, endTime: string) => {
    const response = axios.post(`${API}/reservas/Horror`, { startTime, endTime })
    return response.then(response => response.data)
}



export {
    getSeats,
    getHorrorBookings
}