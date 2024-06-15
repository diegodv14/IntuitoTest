import axios from "axios";
import { newSeat } from "../components/AdminButaca";

const API = 'http://localhost:3002/api'

const getAllSeats = () => {
    const request = axios.get(`${API}/asientos`)
    return request.then(response => response.data)
}


const cancelSeat = (id: number) => {
    const request = axios.delete(`${API}/asientos/${id}`)
    return request.then(response => response.data)
}

const createSeat = (newSeat: newSeat) => {
    const request = axios.post(`${API}/asientos`, newSeat)
    return request.then(response => response.data)
}

export {
    getAllSeats,
    cancelSeat,
    createSeat

}