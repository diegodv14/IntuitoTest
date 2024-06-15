import React, { useContext } from "react"
import { Billboard } from "../context/BookingContext"
import { useState } from "react"
import { billBoardContext } from "../context/BillBoardContext"
import { deleteBillBoard } from "../services/billboardServices"


interface CarteleraProps {
    BillBoard: Billboard
}

export const Cartelera: React.FC<CarteleraProps> = ({ BillBoard }) => {

    const [IsEditing, setIsEditing] = useState(false)
    const { BillBoards, setBillBoards } = useContext(billBoardContext)

    const DeleteBillBoard = async (id: number) => {
        await deleteBillBoard(id)
        const FilterBillBoards = BillBoards.filter(billboard => billboard.id !== id)
        setBillBoards(FilterBillBoards)
    }

    return (
        <li key={BillBoard.id} className="size-36 relative w-full h-[200px] rounded-lg flex flex-col justify-between">
            <div className={`rounded-md w-full relative h-[80%] shadow-md imageMovie${BillBoard.id}`} onMouseOver={() => setIsEditing(true)} onMouseOut={() => setIsEditing(false)}>
                {IsEditing && <>
                    <button className="absolute top-2 left-2" title="Eliminar Cartelera y Reservas" onClick={() => DeleteBillBoard(BillBoard.id)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg></button>
                    <span className="absolute bottom-2 left-2 text-white font-[Tanker]">{BillBoard.Room.name}</span>
                </>}
            </div>
            <div className="h-[20%] p-4 mt-2 flex items-center justify-between flex-row">
                <h1 className="whitespace-nowrap">{BillBoard.Movie.name}</h1>
                <p className="flex flex-row gap-2 items-center whitespace-nowrap"><span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                    <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                    <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                </svg></span>{BillBoard.Movie.lengthMinutes} minutes</p>
            </div>
        </li>
    )
}