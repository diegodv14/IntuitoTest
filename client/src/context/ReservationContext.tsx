import { create } from 'zustand'
import { FormValues } from '../components/FormReserva'


//uso de Zustand para manejar el estado Global

interface booking {
    date: string,
    customerID: number
    billBoardID: number,
    seatID: number
}

interface useReservationStore {
    customer: FormValues
    setCustomer: (newData: FormValues) => void
    booking: booking
    setBooking: (newData: booking) => void,
    setEmptyCustomer: () => void
}

export const useReservationStore = create<useReservationStore>((set) => ({
    customer: {
        age: 0,
        documentNumber: "",
        email: "",
        lastName: "",
        name: "",
        phoneNumber: ""
    },
    booking: {
        date: "",
        customerID: 0,
        billBoardID: 0,
        seatID: 0
    },
    setCustomer: (newData: FormValues) => set((state) => ({ ...state, customer: newData })),
    setEmptyCustomer: () => set((state) => ({
        ...state, customer: {
            age: 0,
            documentNumber: "",
            email: "",
            lastName: "",
            name: "",
            phoneNumber: ""
        }
    })),
    setBooking: (newData: booking) => set((state) => ({ ...state, booking: newData }))
}))
