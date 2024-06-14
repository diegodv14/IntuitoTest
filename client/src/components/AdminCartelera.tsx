import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { billBoardContext } from "../context/BillBoardContext"
import { Cartelera } from "./BillBoard"
import { getBillBoard } from "../services/billboardServices"

export const AdminCartelera = () => {

    const navigate = useNavigate()
    const { BillBoards, setBillBoards } = useContext(billBoardContext)

    useEffect(() => {
        getBillBoard().then(response => setBillBoards(response))
    }, [])

    return (
        <section>
            <nav className="w-full p-6 font-[Tanker] flex items-center justify-between shadow-md">
                <h1 className="text-3xl title">Cartelera Actual</h1>
                <button onClick={() => navigate('/')} title="Volver al Registro"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg></button>
            </nav>
            <ul className="w-[full] flex-1 h-[85%] billboards mt-6 p-10 pt-2">
                {BillBoards.map(BillBoard => <Cartelera key={BillBoard.id} BillBoard={BillBoard} />)}
                <button className="h-[78%] w-full rounded-lg bg-gray-400 flex items-center justify-center shadow-xl"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg></button>
            </ul>
        </section>
    )
}