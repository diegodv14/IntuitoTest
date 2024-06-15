import { useStore } from "zustand"
import { useReservationStore } from "../context/ReservationContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { billBoardContext } from "../context/BillBoardContext"
import { useForm } from "react-hook-form"
import { Billboard } from "../context/BookingContext"
import { formatDateToDDMMYYYY } from "../components/AdminCartelera"
import { createCustomer, getCustomer } from "../services/customerServices"
import { getAllSeats } from "../services/seatServices"
import { Seat } from "../context/BookingContext"
import { createNewBooking } from "../services/reservationServices"

interface Booking {
    rowNumber: number,
    seatID: number
}

export const Booking = () => {

    const { customer, setEmptyCustomer } = useStore(useReservationStore)
    const [allSeats, setAllSeats] = useState<Array<Seat>>()
    const { BillBoards } = useContext(billBoardContext)
    const [movie, setMovie] = useState<Billboard | null>(null)
    const [success, setSuccess] = useState(false)
    const { register, handleSubmit, watch } = useForm<Booking>({
    })
    const watchRow = watch("rowNumber")

    useEffect(() => {
        getAllSeats().then(response => setAllSeats(response))
    }, [])

    const navigate = useNavigate()

    useEffect(() => {
        if (customer.age === 0 || !customer.name || !customer.documentNumber || !customer.email || !customer.lastname || !customer.phoneNumber) {
            navigate('/')
        }
    }, [customer])

    const createBooking = async (data: Booking) => {
        try {
            const IsCustomer = await getCustomer(customer.documentNumber)
            if (!IsCustomer) {
                const customerCreated = await createCustomer(customer)
                const newBooking = {
                    date: formatDateToDDMMYYYY(new Date()),
                    customerID: customerCreated.id,
                    billboardID: movie!.id,
                    seatID: data.seatID
                }
                await createNewBooking(newBooking)
                setSuccess(true)
                setTimeout(() => {
                    setEmptyCustomer()
                }, 3000)
            }
            else if (IsCustomer) {
                const newBooking = {
                    date: formatDateToDDMMYYYY(new Date()),
                    customerID: IsCustomer.id,
                    billboardID: movie!.id,
                    seatID: data.seatID
                }
                console.log(await createNewBooking(newBooking))
                setSuccess(true)
                setTimeout(() => {
                    setEmptyCustomer()
                }, 3000)
            }
        } catch (err) {
            console.log('Hubo un error al crear la reservacion' + err)
        }
    }

    const GoBack = () => {
        navigate('/')
        setEmptyCustomer()
    }


    const uniqueRows = Array.from(new Set(allSeats?.filter(seat => seat.roomID === movie?.roomID).map(seat => seat.rowNumber)));
    const billBoardByAge = BillBoards.filter(BillBoard => BillBoard.Movie.allowedAge <= customer.age)

    return (
        <section className="w-screen h-screen">
            {success && <div className="w-screen h-screen absolute z-50 fondo flex flex-col gap-12 items-center justify-center"><span><svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" fill="green" className="bi bi-calendar2-check-fill" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-2.6 5.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
            </svg></span><h1 className="text-5xl font-[Tanker] text-white">Reserva creada con exito.</h1></div>}
            <div className="flex flex-col gap-2">
                <div className="font-[Tanker] text-2xl shadow-lg w-full flex items-center justify-between p-4"><span>Este es el listado de peliculas que puedes ver segun tu edad 🔞</span>
                    <button onClick={() => GoBack()} title="Volver al Registro"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg></button></div>
                {billBoardByAge.length > 0 && <ul className="w-[full] p-6 pt-4 h-[230px] items-center billboards gap-6">
                    {billBoardByAge.map(BillBoard => <li key={BillBoard.id} onMouseOver={() => setMovie(BillBoard)} className="relative w-[300px] h-[200px] rounded-lg flex flex-col justify-between">
                        <div className={`rounded-md w-full hover:scale-110 transition-all h-[80%] shadow-md ${BillBoard.id === 1 ? "imageMovie1" : "imageMovie2"}`}>
                        </div>
                        <div className="h-[20%] p-4 mt-2 flex items-center justify-between flex-row">
                            <h1 className="whitespace-nowrap">{BillBoard.Movie.name}</h1>
                            <p className="flex flex-row gap-2 items-center whitespace-nowrap"><span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                            </svg></span>{BillBoard.Movie.lengthMinutes} minutes</p>
                        </div>
                    </li>)}
                </ul>}
                {billBoardByAge.length === 0 && <div className="w-full p-6 h-[520px] flex flex-col gap-1 items-center justify-center">
                    <span><svg viewBox="0 -12.02 94.572 94.572" width='150' height='150' xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="sad" transform="translate(-205.409 -53.014)"> <path id="Path_14" data-name="Path 14" d="M206.832,87.785c.283-26.649,16.426-33.362,45.857-33.353,29.458.009,45.585,6.732,45.869,33.353.293,27.433-16.715,34.458-46.565,34.333C222.506,121.992,206.548,114.549,206.832,87.785Z" fill="#b9e2f8" fillRule="evenodd"></path> <path id="Path_15" data-name="Path 15" d="M206.832,87.785c.015-1.428.078-2.8.184-4.11,1.853,22.4,17.57,28.84,44.977,28.957,27.8.116,44.46-5.971,46.38-28.97.106,1.319.17,2.69.185,4.123.293,27.433-16.714,34.458-46.565,34.333C222.506,121.992,206.548,114.55,206.832,87.785Z" fill="#1a1818" fillRule="evenodd" opacity="0.15"></path> <path id="Path_16" data-name="Path 16" d="M205.413,87.774c.148-13.863,4.477-22.577,12.649-27.858,8.008-5.175,19.647-6.907,34.627-6.9s26.629,1.745,34.643,6.925c8.171,5.282,12.5,13.991,12.645,27.835.152,14.26-4.252,23.255-12.624,28.7-8.211,5.341-20.176,7.124-35.366,7.06-15.021-.064-26.638-2.02-34.54-7.422-8.051-5.5-12.181-14.431-12.034-28.34ZM219.6,62.308c-7.328,4.735-11.212,12.7-11.348,25.488-.136,12.855,3.571,21.031,10.8,25.971,7.377,5.043,18.483,6.871,32.949,6.932,14.66.062,26.125-1.606,33.808-6.6,7.52-4.893,11.474-13.128,11.334-26.3C297,75.02,293.123,67.056,285.8,62.319c-7.485-4.838-18.638-6.464-33.107-6.469C238.239,55.846,227.089,57.467,219.6,62.308Z" fill="#1a1818" fillRule="evenodd"></path> <path id="Path_17" data-name="Path 17" d="M240.627,92.208a1.419,1.419,0,0,1-2.147-1.857,17.965,17.965,0,0,1,1.869-1.873,19.154,19.154,0,0,1,24.684,0,18.133,18.133,0,0,1,1.876,1.874,1.419,1.419,0,0,1-2.146,1.857,15.317,15.317,0,0,0-1.588-1.584,16.308,16.308,0,0,0-20.969,0A15.239,15.239,0,0,0,240.627,92.208Z" fill="#1a1818" fillRule="evenodd"></path> <path id="Path_18" data-name="Path 18" d="M228.951,82.24a6.226,6.226,0,1,0-6.226-6.226A6.238,6.238,0,0,0,228.951,82.24Z" fill="#1a1818" fillRule="evenodd"></path> <path id="Path_19" data-name="Path 19" d="M228.356,75.624a2,2,0,1,0-2-2A2,2,0,0,0,228.356,75.624Z" fill="#ffffff" fillRule="evenodd"></path> <path id="Path_20" data-name="Path 20" d="M226.258,78.943a1.241,1.241,0,1,0-1.241-1.24A1.242,1.242,0,0,0,226.258,78.943Z" fill="#ffffff" fillRule="evenodd"></path> <g id="Group_5" data-name="Group 5"> <path id="Path_21" data-name="Path 21" d="M276.439,82.24a6.226,6.226,0,1,0-6.226-6.226A6.238,6.238,0,0,0,276.439,82.24Z" fill="#1a1818" fillRule="evenodd"></path> <path id="Path_22" data-name="Path 22" d="M275.845,75.624a2,2,0,1,0-2-2A2,2,0,0,0,275.845,75.624Z" fill="#ffffff" fillRule="evenodd"></path> <path id="Path_23" data-name="Path 23" d="M273.747,78.943a1.241,1.241,0,1,0-1.241-1.24A1.242,1.242,0,0,0,273.747,78.943Z" fill="#ffffff" fillRule="evenodd"></path> </g> <path id="Path_24" data-name="Path 24" d="M231.978,88.89l-6.057,0a1.68,1.68,0,0,1-1.171-2.884,5.51,5.51,0,0,1,.471-.459,5.767,5.767,0,0,1,7.456,0,5.536,5.536,0,0,1,.568.568,1.678,1.678,0,0,1-1.267,2.773Z" fill="#eb505e" fillRule="evenodd"></path> <path id="Path_25" data-name="Path 25" d="M279.468,88.892H273.41A1.68,1.68,0,0,1,272.247,86a5.581,5.581,0,0,1,.462-.449,5.77,5.77,0,0,1,7.458,0,5.471,5.471,0,0,1,.567.56,1.68,1.68,0,0,1-1.266,2.782Z" fill="#eb505e" fillRule="evenodd"></path> <path id="Path_26" data-name="Path 26" d="M228.95,82.738c2.345,0,4.258-.717,4.258-1.6s-1.913-1.6-4.258-1.6-4.258.717-4.258,1.6S226.6,82.738,228.95,82.738Z" fill="#00a1ed" fillRule="evenodd"></path> <path id="Path_27" data-name="Path 27" d="M276.439,82.738c2.345,0,4.258-.717,4.258-1.6s-1.913-1.6-4.258-1.6-4.259.717-4.259,1.6S274.093,82.738,276.439,82.738Z" fill="#00a1ed" fillRule="evenodd"></path> </g> </g></svg></span>
                    <h1>Lo sentimos, no puedes ver ninguna pelicula.</h1>
                </div>}
            </div>
            {billBoardByAge.length > 0 && <div className="h-[315px] p-6 bg-zinc-900 items-center justify-end flex relative">
                {!movie && <h1 className="absolute font-[Tanker] text-2xl top-4 left-5 text-white title">Pasa el cursor sobre una pelicula para seleccionarla.</h1>}
                {movie && <><div className="flex-col gap-2 top-16 left-5 flex h-[280px] w-[300px] absolute">
                    <h1 className="font-[Tanker] text-2xl text-white title">Usted eligio:</h1>
                    <span className="text-white flex flex-row gap-2"><span className="font-[Tanker]">Pelicula: </span> {movie.Movie.name}</span>
                    <span className="text-white flex flex-row gap-2"><span className="font-[Tanker]">Genero: </span> {movie.Movie.genre.slice()[0]}{movie.Movie.genre.slice(1).toLowerCase()}</span>
                    <span className="text-white flex flex-row gap-1 whitespace-nowrap"><span className="font-[Tanker]">Duracion en Cartelera:</span> <span className="">De {movie.startTime} a {movie.endTime} </span> </span>
                    <span className="text-white flex flex-row gap-2"><span className="font-[Tanker]">Edad Permitida: </span>+{movie.Movie.allowedAge}</span>
                    <span className="text-white flex flex-row gap-2"><span className="font-[Tanker]">Lugar: </span>{movie.Room.name}</span>
                </div>
                    <form className="h-[80%] w-[72%] flex items-center justify-around border-l" onSubmit={handleSubmit(createBooking)}>
                        <label htmlFor="row" className="flex flex-row gap-4 items-center whitespace-nowrap text-white">Filas en esta Sala:
                            <select id="row" className="bg-transparent border-white p-2  border-[1px] rounded-lg" {...register("rowNumber", { required: true })}>
                                <option value="" className="text-black">Selecciona una fila</option>
                                {uniqueRows.map(rowNumber => (
                                    <option className="text-black" value={rowNumber} key={rowNumber}>
                                        Fila {rowNumber}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {watchRow && <label htmlFor="seat" className="flex flex-row gap-4 items-center whitespace-nowrap text-white">Butacas Disponibles:
                            <select id="seat" className="bg-transparent border-white p-2  border-[1px] rounded-lg" {...register("seatID", { required: true })}>
                                <option value="" className="text-black">Seleccione una butaca</option>
                                {allSeats?.filter(seat => seat.roomID === movie.roomID && seat.rowNumber === Number(watchRow) && seat.status === true).map(seat => <option className="text-black" key={seat.id} value={seat.id}>Butaca {seat.number}</option>)}
                            </select>
                        </label>}
                        <button className="flex flex-row gap-2 text-sm shadow-xl w-fit h-fit items-center bg-white rounded-full text-black p-3 pl-5 pr-5"><span>Reservar</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-journal-check" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                        </svg></button>
                    </form></>}
            </div>}
        </section >
    )
}