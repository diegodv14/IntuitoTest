import { create } from "zustand"

interface Movie {
    id: number;
    name: string;
    genre: string;
    allowedAge: number;
    lengthMinutes: number;
    status: boolean;
}

interface Billboard {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    movieID: number;
    roomID: number;
    status: boolean;
    Movie: Movie;
}

interface Customer {
    id: number;
    documentNumber: string;
    name: string;
    lastname: string;
    age: number;
    phoneNumber: string;
    email: string;
    status: boolean;
}

interface Room {
    id: number
    name: string
    number: number
    status: boolean
}

interface Seat {
    id: number
    number: number
    rowNumber: number
    roomID: number
    status: boolean
    Room: Room

}
interface Booking {
    id: number;
    date: string;
    customerID: number;
    billboardID: number;
    seatID: number;
    status: boolean;
    Customer: Customer;
    Billboard: Billboard;
    Seat: Seat
}

interface bookingContextProps {
    bookings: Array<Booking> | Array<null>
    setBookings: (newData: Array<Booking>) => void
}

export const useBookingStore = create<bookingContextProps>((set) => ({
    bookings: [],
    setBookings: (newData: Array<Booking>) => set(() => ({ bookings: newData }))
}))
