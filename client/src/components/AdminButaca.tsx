import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllSeats, getAvailableRooms } from "../services/billboardServices"
import { Room, Seat } from "../context/BookingContext"

export const AdminButaca = () => {

    const [allSeats, setAllSeats] = useState<Array<Seat>>()
    const [allRooms, setAllRooms] = useState<Array<Room>>()

    useEffect(() => {
        getAllSeats().then(response => setAllSeats(response))
        getAvailableRooms().then(response => setAllRooms(response))
    }, [])

    const navigate = useNavigate()

    return (
        <section className="flex flex-col">
            <nav className="w-full p-6 font-[Tanker] flex items-center justify-between shadow-md">
                <h1 className="text-3xl title">Administras Butacas</h1>
                <button onClick={() => navigate('/')} title="Volver al Registro"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg></button>
            </nav>
            <section className="w-full h-[540px] p-6 rooms">
                {allRooms && allRooms.map(room => {

                    const seatsPerRoom = allSeats && allSeats.filter(seat => seat.roomID === room.id)

                    return (
                        <div key={room.id} className="h-fit w-full flex flex-col border gap-3 items-center justify-center">
                            <h1 className="border w-full p-2 flex flex-row gap-2 flex-nowrap items-center justify-center">{room.name} <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
                                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                            </svg></h1>
                            <ul className="flex flex-col items-center w-full gap-8 p-6">
                                {seatsPerRoom && seatsPerRoom.length > 0 && seatsPerRoom.map(seat => <li key={seat.id} className="flex flex-row whitespace-nowrap w-full gap-8 items-center"><div className="flex flex-row gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-inbox" viewBox="0 0 16 16">
                                    <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z" />
                                </svg><span className="font-[Tanker]">Butaca#:</span> {seat.number}</div> <div><span className="font-[Tanker]">Fila:</span> {seat.rowNumber} </div> <div><span className="font-[Tanker]">Estado:</span> {seat.status === true ? "Libre" : "Ocupado"}</div>{seat.status === false && <button title="Despejar butaca y cancelar reserva" className="justify-self-end"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="red" className="bi bi-journal-x" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708" />
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                                </svg></button>}</li>)}
                                {seatsPerRoom && seatsPerRoom.length === 0 && <li className="text-black">No hay butacas registradas en esta sala.</li>}
                            </ul>
                        </div>
                    )
                })}
            </section>
        </section>
    )
}