import { create } from "zustand"

export interface Movie {
    id: number;
    name: string;
    genre: 'ACTION' | 'ADVENTURE' | 'COMEDY' | 'DRAMA' | 'FANTASY' | 'HORROR' | 'MUSICALS' | 'MYSTERY' | 'ROMANCE' | 'SCIENCE_FICTION' | 'SPORTS' | 'THRILLER' | 'WESTERN';
    allowedAge: number;
    lengthMinutes: number;
    status: boolean;
}

export interface Billboard {
    id: number;
    date: Date;
    startTime: string;
    endTime: string;
    movieID: number;
    roomID: number;
    status: boolean;
    Movie: Movie;
    Room: Room
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

export interface Room {
    id: number
    name: string
    number: number
    status: boolean
}

export interface Seat {
    id: number
    number: number
    rowNumber: number
    roomID: number
    status: boolean
    Room: Room

}
export interface Booking {
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
