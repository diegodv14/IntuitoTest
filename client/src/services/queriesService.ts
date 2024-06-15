import axios from "axios"

const API = "http://localhost:3002/api"


const getSeats = () => {
    const request = axios.get(`${API}/butacas/disponibles`)
    return request.then(response => response.data)
}

const getHorrorBookings = (startTime: string, endTime: string) => {
    const request = axios.post(`${API}/reservas/Horror`, { startTime, endTime })
    return request.then(response => response.data)
}




export {
    getSeats,
    getHorrorBookings
}