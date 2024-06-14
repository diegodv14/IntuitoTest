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

const getAvailableRooms = () => {
    const request = axios.get(`${API}/salas`)
    return request.then(response => response.data)
}

const getAllSeats = () => {
    const request = axios.get(`${API}/asientos`)
    return request.then(response => response.data)
}


const deleteBillBoard = (billBoardID: number) => {
    const request = axios.delete(`${API}/cartelera/${billBoardID}`)
    return request.then(response => response.data)
}
export {
    getBillBoard,
    getBookings,
    deleteBillBoard,
    getAvailableRooms,
    getAllSeats
}

