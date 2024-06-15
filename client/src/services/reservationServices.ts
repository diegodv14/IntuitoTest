import axios from "axios";

const API = 'http://localhost:3002/api'


type newBooking = {
    date: string,
    customerID: number,
    billboardID: number,
    seatID: number
}


const getBookings = () => {
    const request = axios.get(`${API}/reservaciones`)
    return request.then(response => response.data)
}

const createNewBooking = (newBooking: newBooking) => {
    const request = axios.post(`${API}/reservaciones`, newBooking)
    return request.then(response => response.data)
}

export {
    getBookings,
    createNewBooking
}

