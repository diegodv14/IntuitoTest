import axios from "axios";

const API = 'http://localhost:3002/api'


type newBillboard = {
    date: string;
    movieID: number;
    startTime: string;
    endTime: string;
    roomID: number;
}

const getBillBoard = () => {
    const request = axios.get(`${API}/carteleras`)
    return request.then(response => response.data)
}


const createBillboard = (newBillboard: newBillboard) => {
    const request = axios.post(`${API}/carteleras`, newBillboard)
    return request.then(response => response.data)
}

const deleteBillBoard = (billBoardID: number) => {
    const request = axios.delete(`${API}/carteleras/${billBoardID}`)
    return request.then(response => response.data)
}


export {
    getBillBoard,
    deleteBillBoard,
    createBillboard
}

