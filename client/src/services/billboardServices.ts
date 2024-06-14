import axios from "axios";

const API = 'http://localhost:3002/api'


const getBillBoard = () => {
    const request = axios.get(`${API}/carteleras`)
    return request.then(response => response.data)
}

const getBookings = () => {
    const request = axios.get(`${API}/reservaciones`)
    return request.then(response => response.data)
}

export {
    getBillBoard,
    getBookings
}

