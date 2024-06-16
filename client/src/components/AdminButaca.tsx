import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createRoom, getAvailableRooms } from "../services/roomServices"
import { Room, Seat } from "../context/BookingContext"
import { useForm } from "react-hook-form"
import { cancelSeat, getAllSeats, createSeat } from "../services/seatServices"


export type newSeat = {
    number: number
    rowNumber: number
    roomID: number
}

export const AdminButaca = () => {
    const [loading, setLoading] = useState(false);
    const [allSeats, setAllSeats] = useState<Array<Seat>>()
    const [allRooms, setAllRooms] = useState<Array<Room>>()
    const [isCreating, setIsCreating] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { register, handleSubmit, reset, formState: { errors } } = useForm<newSeat>()

    useEffect(() => {
        getAllSeats().then(response => setAllSeats(response))
        getAvailableRooms().then(response => setAllRooms(response))
    }, [])

    const navigate = useNavigate()

    const doCancel = async (id: number) => {
        cancelSeat(id).then(response => console.log(response))
        const updatedSeats = allSeats?.map(seat => {
            if (seat.id === id) {
                return { ...seat, status: true };
            }
            return seat;
        });
        setAllSeats(updatedSeats)
    }

    const createNewSeat = async (data: newSeat) => {
        if (loading) return

        setLoading(true)
        try {
            const validation = validateSeatNumber(data)
            if (validation === true) {
                const newSeat = await createSeat(data)
                setAllSeats(prevState => (prevState ? [...prevState, newSeat] : [newSeat]));
                reset()
                setIsCreating(false)
                setLoading(false)
            }
            else {
                setErrorMessage(validation)
                setTimeout(() => {
                    setErrorMessage("")
                }, 4000)
                setLoading(false)
            }
        } catch (err) {
            console.log('Hubo un error al registrar la butaca.')
            setLoading(false)
        }
    }

    const createNewRoom = async () => {
        if (loading) return
        setLoading(true)

        try {
            const CreatedRoom = await createRoom()
            setAllRooms(prevState => (prevState ? [...prevState, CreatedRoom] : [CreatedRoom]))
            setLoading(false)
        }
        catch (err) {
            console.log('Hubo un error al crear una sala.')
            setLoading(false)
        }
    }

    const validateSeatNumber = (data: newSeat) => {
        const seatExists = allSeats?.some(seat => seat.roomID === Number(data.roomID) && seat.rowNumber === Number(data.rowNumber) && seat.number === Number(data.number))
        if (seatExists) {
            return "Este número de butaca ya existe en la fila y sala seleccionadas"
        }
        return true
    }


    return (
        <section className="flex flex-col">
            <nav className="w-full p-6 font-[Tanker] flex items-center justify-between shadow-md">
                <h1 className="text-3xl title">Administras Butacas</h1>
                <div className="flex flex-row-reverse w-fit gap-4">
                    <button onClick={() => navigate('/')} title="Volver al Registro"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg></button>
                    <button onClick={() => setIsCreating(!isCreating)} className="flex flex-row gap-2 items-center font-[Raleway]">{isCreating === false ? <><h1>Registrar Butaca</h1><svg xmlns=" http://www.w3.org/2000/svg" width="22" height="22" fill="green" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <title>Registar nueva Butaca</title>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg></> : <><h1>Cancelar Registro</h1><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <title>Cancelar Registro Nueva Butaca</title>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg></>}</button>
                </div>
            </nav >
            <section className="w-full h-[550px] p-6 rooms pb-20 overflow-x-hidden overflow-y-auto">
                {!allRooms && <h1>Loading...</h1>}
                {allRooms && allRooms.sort((a, b) => a.number - b.number).map(room => {
                    const seatsPerRoom = allSeats && allSeats.filter(seat => seat.roomID === room.id)
                    return (
                        <div key={room.id} className="h-[250px] w-full flex flex-col border gap-3 items-center justify-start">
                            <h1 className="border relative w-full p-2 flex flex-row gap-2 flex-nowrap items-center justify-center">{room.name} <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
                                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                            </svg>
                                <span className="absolute top-3 left-3 text-sm font-[Tanker]">{room.status === true ? 'Libre' : 'En cartelera'}</span>
                            </h1>
                            <ul className="flex flex-col items-center overflow-y-auto overflow-x-hidden w-full gap-6 p-5">
                                {seatsPerRoom && seatsPerRoom.length > 0 && seatsPerRoom.map(seat => <li key={seat.id} className="flex flex-row whitespace-nowrap w-full gap-4 items-center"><div className="flex flex-row gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-inbox" viewBox="0 0 16 16">
                                    <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z" />
                                </svg><span className="font-[Tanker]">Butaca#:</span> {seat.number}</div> <div className="flex flex-row gap-2 items-center"><span className="font-[Tanker]">Fila:</span> {seat.rowNumber} </div> <div className="flex flex-row gap-2 items-center"><span className="font-[Tanker]">Estado:</span> {seat.status === true ? "Libre" : "Ocupado"}</div>{seat.status === false && <button onClick={() => doCancel(seat.id)} title="Despejar butaca y cancelar reserva" className="justify-self-end"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="red" className="bi bi-journal-x" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708" />
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                                </svg></button>}</li>)}
                                {seatsPerRoom && seatsPerRoom.length === 0 && <li className="text-black">No hay butacas registradas en esta sala.</li>}
                            </ul>
                        </div>
                    )
                })}
                <button onClick={() => createNewRoom()} className={`h-[250px] w-full rounded-lg bg-gray-400 text-gray-200" opacity-30 active:scale-90 flex items-center justify-center shadow-xl`}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg></button>
            </section>
            {
                isCreating && <div className="animate__animated shadow-xl animate__slideInUp flex flex-col absolute bottom-0 bg-[#121312] w-screen h-[300px]">
                    <h1 className="text-3xl p-6 font-[Tanker] text-white title">Registrar nueva Butaca</h1>
                    {errorMessage && <p className="ml-6 text-red-500 font-semibold text-[9px]">{errorMessage}</p>}
                    <form onSubmit={handleSubmit(createNewSeat)} className="w-full p-6 flex flex-row gap-12">
                        <label htmlFor="room" className="flex flex-row gap-4 items-center whitespace-nowrap text-white">Sala:
                            <select id="room" className="bg-transparent border-white p-2  border-[1px] rounded-lg" {...register("roomID", { required: true })}>
                                <option value="" className="text-black">Seleccione una sala</option>
                                {allRooms && allRooms.map(room => <option className="text-black" key={room.id} value={room.id}>{room.name}</option>)}
                            </select>
                        </label>
                        {errors.roomID && <p className="text-red-500">{errors.roomID.message}</p>}

                        <label htmlFor="rowNumber" className="label">
                            <input type="number" id="rowNumber" placeholder="" className=" text-white input" autoComplete="off" {...register("rowNumber", { required: true })} />
                            <span className="label_name text-white" style={{ userSelect: "none" }}>Numero de Fila</span>
                        </label>
                        {errors.rowNumber && <p className="text-red-500">{errors.rowNumber.message}</p>}
                        <label htmlFor="number" className="label">
                            <input type="number" id="number" placeholder="" className=" text-white input" autoComplete="off" {...register("number", {
                                required: true
                            })} />
                            <span className="label_name text-white" style={{ userSelect: "none" }}>Numero de Butaca</span>
                        </label>
                        {errors.number && <p className="text-red-500">{errors.number.message}</p>}
                        <button type="submit" className="flex flex-row gap-2 text-sm shadow-xl absolute top-5 left-80 w-fit items-center bg-white rounded-full text-black p-3 pl-5 pr-5">Crear Butaca <span><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-inbox" viewBox="0 0 16 16">
                            <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z" />
                        </svg></span></button>
                    </form>

                </div>
            }

        </section >
    )
}