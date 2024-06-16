import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { billBoardContext } from "../context/BillBoardContext"
import { Cartelera } from "./BillBoard"
import { createBillboard, getBillBoard } from "../services/billboardServices"
import { getAvailableRooms } from "../services/roomServices"
import { useForm } from "react-hook-form"
import 'animate.css';
import { Room } from "../context/BookingContext"
import { createMovie } from "../services/movieServices"

export enum Genre {
    ACTION = 'ACTION',
    ADVENTURE = 'ADVENTURE',
    COMEDY = 'COMEDY',
    DRAMA = 'DRAMA',
    FANTASY = 'FANTASY',
    HORROR = 'HORROR',
    MUSICALS = 'MUSICALS',
    MYSTERY = 'MYSTERY',
    ROMANCE = 'ROMANCE',
    SCIENCE_FICTION = 'SCIENCE_FICTION',
    SPORTS = 'SPORTS',
    THRILLER = 'THRILLER',
    WESTERN = 'WESTERN'
}

type NewBillBoardProps = {
    name: string,
    genre: Genre,
    allowedAge: number,
    lengthMinutes: number,
    startTime: string,
    endTime: string,
    roomID: number,
}

export const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
};

export const AdminCartelera = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const { BillBoards, setBillBoards } = useContext(billBoardContext)
    const [newBillBoard, setNewBillBoard] = useState(false)
    const { register, handleSubmit, reset } = useForm<NewBillBoardProps>()
    const [availableRooms, setAvailableRooms] = useState<Array<Room>>()

    useEffect(() => {
        getBillBoard().then(response => setBillBoards(response))

    }, [])

    useEffect(() => {
        getAvailableRooms().then(response => setAvailableRooms(response))
    }, [BillBoards])

    const createNewBillBoard = async (data: NewBillBoardProps) => {

        if (loading) return

        setLoading(true)

        const newMovie = {
            name: data.name,
            genre: data.genre,
            allowedAge: data.allowedAge,
            lengthMinutes: data.lengthMinutes,
        }
        const CreatedMovie = await createMovie(newMovie)
        const newBillBoard = {
            date: formatDateToDDMMYYYY(new Date()),
            movieID: CreatedMovie.id,
            startTime: data.startTime,
            endTime: data.endTime,
            roomID: Number(data.roomID)
        }
        const CreatedBillBoard = await createBillboard(newBillBoard)
        setBillBoards(prevState => [...prevState, CreatedBillBoard])
        reset()
        setNewBillBoard(false)
        setLoading(false)

    }

    return (
        <section className="relative">
            <nav className="w-full p-6 font-[Tanker] flex items-center justify-between shadow-md">
                <h1 className="text-3xl title">Administrar Cartelera</h1>
                <button onClick={() => navigate('/')} title="Volver al Registro"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg></button>
            </nav>
            <ul className="w-[full] flex-1 h-[280px] billboards p-10 overflow-y-auto overflow-x-hidden">
                {BillBoards && BillBoards.map(BillBoard => <Cartelera key={BillBoard.id} BillBoard={BillBoard} />)}
                <button onClick={() => setNewBillBoard(!newBillBoard)} className={`h-[150px] w-full rounded-lg ${newBillBoard === false ? "bg-gray-400 text-gray-200" : "bg-red-700 text-red-500"} opacity-30 active:scale-90 flex items-center justify-center shadow-xl`}>{newBillBoard === false ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>}</button>
            </ul>
            {newBillBoard && <div className="absolute animate__animated shadow-xl animate__slideInUp flex flex-col bg-[#121312] w-screen h-[275px]">
                <h1 className="text-3xl p-6 font-[Tanker] text-white title">Crear nueva Cartelera</h1>
                <form onSubmit={handleSubmit(createNewBillBoard)} className=" grid grid-rows-2 grid-cols-4 items-center gap-6 w-full pr-12 pl-12 text-white">
                    <label htmlFor="name" className="label">
                        <input type="text" id="name" placeholder="" className=" text-white input" autoComplete="off" {...register("name", { required: true })} />
                        <span className="label_name text-white" style={{ userSelect: "none" }}>Nombre de la Pelicula</span>
                    </label>
                    <label htmlFor="genre" className="flex flex-row gap-4 items-center">Genero:
                        <select id="genre" className="bg-transparent border-white p-2  border-[1px] rounded-lg" {...register("genre", { required: true })}>
                            {Object.values(Genre).map((g) => (
                                <option key={g} className="text-black" value={g}>
                                    {g.slice()[0]}{g.slice(1).toLowerCase().replace('_', ' ')}
                                </option>))}
                        </select>
                    </label>
                    <label htmlFor="allowedAge" className="label">
                        <input type="number" id="allowedAge" placeholder="" className=" text-white input" autoComplete="off" {...register("allowedAge", { required: true })} />
                        <span className="label_name text-white" style={{ userSelect: "none" }}>Edad minima</span>
                    </label>
                    <label htmlFor="lengthMinutes" className="label">
                        <input type="number" id="lengthMinutes" placeholder="" className=" text-white input" autoComplete="off" {...register("lengthMinutes", { required: true })} />
                        <span className="label_name text-white" style={{ userSelect: "none" }}>Duracion</span>
                    </label>
                    <label htmlFor="startTime" className="label">
                        <input type="time" id="startTime" placeholder="" className=" text-white input" autoComplete="off" {...register("startTime", { required: true })} />
                        <span className="label_name text-white" style={{ userSelect: "none" }}>Comienza</span>
                    </label>
                    <label htmlFor="endTime" className="label">
                        <input type="time" id="endTime" placeholder="" className=" text-white input" autoComplete="off" {...register("endTime", { required: true })} />
                        <span className="label_name text-white" style={{ userSelect: "none" }}>Termina</span>
                    </label>
                    <label htmlFor="roomID" className="flex flex-row gap-4 items-center whitespace-nowrap">Salas disponibles:
                        <select id="roomID" className="bg-transparent border-white p-2  border-[1px] rounded-lg" {...register("roomID", { required: true })}>
                            <option value="" className="text-black">Seleccione una sala</option>
                            {availableRooms && availableRooms.filter(room => room.status === true).map(room => <option className="text-black" key={room.id} value={room.id}>{room.name}</option>)}
                        </select>
                    </label>
                    <button type="submit" className="flex flex-row gap-2 text-sm shadow-xl absolute top-5 left-80 w-fit items-center bg-white rounded-full text-black p-3 pl-5 pr-5">Crear Cartelera <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                    </svg></span></button>
                </form>
            </div>}
        </section>
    )
}