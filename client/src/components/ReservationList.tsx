import { useEffect } from "react"
import { getBookings } from "../services/reservationServices"
import { useStore } from "zustand"
import { useBookingStore } from "../context/BookingContext"
import { useNavigate } from "react-router-dom"

export const ReservationList = () => {

    const { bookings, setBookings } = useStore(useBookingStore)
    const navigate = useNavigate()

    useEffect(() => {
        getBookings().then(response => setBookings(response))
    }, [])

    return (
        <section className="w-screen h-screen">
            <nav className="w-full p-6 font-[Tanker] flex items-center justify-between shadow-md">
                <h1 className="text-3xl title">Lista de Reservas Actuales.</h1>
                <button onClick={() => navigate('/')} title="Volver al Registro"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg></button>
            </nav>
            <ul className="p-6 flex flex-col gap-4">
                {bookings.length === 0 && <h1 className="self-center">Loading...</h1>}
                {bookings.map((booking, i) => <li className="flex text-white rounded-lg p-3 flex-row items-center gap-4 bg-zinc-900" key={booking?.id}>
                    <span className="flex items-center justify-center bg-white rounded-full p-3 size-10 font-semibold text-black">{i + 1}</span>
                    <span><strong>Nombre:  </strong>{booking?.Customer.name} {booking?.Customer.lastname}</span>
                    <span><strong>C.I: </strong>{booking?.Customer.documentNumber}</span>
                    <span><strong>Email:  </strong>{booking?.Customer.email}</span>
                    <span><strong>Celular: </strong>{booking?.Customer.phoneNumber}</span>
                    <span><strong>Pelicula: </strong>{booking?.Billboard.Movie.name}</span>
                    <span><strong>Sala: </strong>{booking?.Seat.Room.name}</span>
                    <span><strong>Butaca: </strong>{booking?.Seat.number}</span>
                    <span><strong>Fila: </strong>{booking?.Seat.rowNumber}</span>
                </li>)}
            </ul>
        </section>
    )
}