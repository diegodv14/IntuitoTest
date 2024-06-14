import { useContext, useEffect, useState } from "react"
import { getHorrorBookings, getSeats } from "../services/queriesService"
import { getBillBoard } from "../services/billboardServices"
import { billBoardContext } from "../context/BillBoardContext"
import { Link } from "react-router-dom"
import { FormReserva } from "../components/FormReserva"

export const Dashboard = () => {

    const { BillBoards, setBillBoards } = useContext(billBoardContext)

    useEffect(() => {
        getBillBoard().then(response => setBillBoards(response))
    }, [BillBoards])

    const nombresMeses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    const today = new Date()

    // const getSeatsAvailableAndBusy = async () => {
    //     console.log(await getSeats())
    // }

    // const getHorrorBookingsBetweenHours = async () => {
    //     console.log(await getHorrorBookings('18:00:00', '21:00:00'))
    // }

    return (
        <main className="flex flex-row h-screen">
            <section className="w-[60%] h-full shadow-lg flex flex-col p-8">
                <nav className="flex flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold p-2 title">Cartelera del {String(today.getDate())} de {String(nombresMeses[today.getMonth()])} del {String(today.getFullYear())}</h1>
                </nav>
                <ul className="w-[full] flex-1 h-[85%] billboards mt-6 p-2">
                    {BillBoards.map(BillBoard => <li key={BillBoard.id} className="size-36 relative w-full h-[200px] rounded-lg flex flex-col justify-between">
                        <div className="bg-red-500 rounded-md w-full hover:scale-110 transition-all h-[80%] shadow-md imageMovie">
                        </div>
                        <div className="h-[20%] p-4 mt-2 flex items-center justify-between flex-row">
                            <h1 className="whitespace-nowrap">{BillBoard.Movie.name}</h1>
                            <p className="flex flex-row gap-2 items-center whitespace-nowrap"><span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                            </svg></span>{BillBoard.Movie.lengthMinutes} minutes</p>
                        </div>
                    </li>)}
                </ul>
            </section>
            <aside className="flex-1 p-10 flex items-center justify-center movie relative">
                <div className="flex flex-row gap-6 ml-3 h-fit absolute top-12 right-6 text-white">
                    <Link to={'/Butaca'} className="text-sm opacity-80 hover:opacity-100" title="Administrar Butacas"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-inboxes-fill" viewBox="0 0 16 16">
                        <path d="M4.98 1a.5.5 0 0 0-.39.188L1.54 5H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0A.5.5 0 0 1 10 5h4.46l-3.05-3.812A.5.5 0 0 0 11.02 1zM3.81.563A1.5 1.5 0 0 1 4.98 0h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 10H1.883A1.5 1.5 0 0 1 .394 8.686l-.39-3.124a.5.5 0 0 1 .106-.374zM.125 11.17A.5.5 0 0 1 .5 11H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0 .5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 .496.562l-.39 3.124A1.5 1.5 0 0 1 14.117 16H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .121-.393z" />
                    </svg></Link>
                    <Link to={'/Cartelera'} className="text-sm opacity-80 hover:opacity-100" title="Administrar Cartelera"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                    </svg></Link>
                </div>
                <FormReserva />
            </aside>
        </main>
    )
}