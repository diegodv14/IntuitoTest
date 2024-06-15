import axios from "axios";
import { FormValues } from "../components/FormReserva";

const API = 'http://localhost:3002/api'

const createCustomer = (newCustomer: FormValues) => {
    const request = axios.post(`${API}/cliente`, newCustomer)
    return request.then(response => response.data)
}

const getCustomer = (ci: string) => {
    const request = axios.get(`${API}/cliente/${ci}`)
    return request.then(response => response.data)
}


export {
    createCustomer,
    getCustomer
}