
import axios from "axios";

const API = 'http://localhost:3002/api'


const getAvailableRooms = () => {
    const request = axios.get(`${API}/salas`)
    return request.then(response => response.data)
}

const createRoom = () => {
    const request = axios.post(`${API}/salas`)
    return request.then(response => response.data)
}

export {
    getAvailableRooms,
    createRoom
}