import { create } from 'zustand'
import { FormValues } from '../components/FormReserva'


//uso de Zustand para manejar el estado Global

interface useReservationStore {
    customer: FormValues
    setCustomer: (newData: FormValues) => void
    setEmptyCustomer: () => void
}

export const useReservationStore = create<useReservationStore>((set) => ({
    customer: {
        age: 0,
        documentNumber: "",
        email: "",
        lastname: "",
        name: "",
        phoneNumber: ""
    },
    setCustomer: (newData: FormValues) => set((state) => ({ ...state, customer: newData })),
    setEmptyCustomer: () => set((state) => ({
        ...state, customer: {
            age: 0,
            documentNumber: "",
            email: "",
            lastname: "",
            name: "",
            phoneNumber: ""
        }
    })),
}))
