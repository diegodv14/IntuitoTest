import { useForm } from "react-hook-form"
import { useContext } from "react"
import { billBoardContext } from "../context/BillBoardContext"


interface FormReservaProps {
    movie: string
}

type FormValues = {
    name: string
    lastName: string
    documentNumber: string
    age: number
    phoneNumber: string
    email: string
    movie: string
}


export const FormReserva: React.FC<FormReservaProps> = ({ movie }) => {

    const { BillBoards } = useContext(billBoardContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            movie: movie
        }
    })

    const newBooking = (data) => {

    }

    return (
        <div className="flex flex-col gap-3 items-center">
            <h1 className="text-2xl text-white font-[Tanker]">Realiza tu Reservación 🎞</h1>
            <form onSubmit={handleSubmit(newBooking)} className="w-full grid grid-cols-2 p-5 h-[80%] items-center justify-end gap-4 rounded-lg text-white">
                <label htmlFor="name" className="label">
                    <input type="text" id="name" placeholder="" className="text-white input" autoComplete="off" {...register("name")} />
                    <span className="label_name" style={{ userSelect: "none" }}>Nombre</span>
                </label>
                <label htmlFor="lastname" className="label">
                    <input type="text" id="lastname" placeholder="" className="text-white input" autoComplete="off" {...register("lastName", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>Apellido</span>
                </label>
                <label htmlFor="documentNumber" className="label">
                    <input type="text" id="documentNumber" placeholder="" className="text-white input" autoComplete="off" {...register("documentNumber", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>C.I</span>
                </label>
                <label htmlFor="age" className="label">
                    <input type="number" id="age" placeholder="" className="text-white input" autoComplete="off" {...register("age", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>Edad</span>
                </label>
                <label htmlFor="phoneNumber" className="label">
                    <input type="text" id="phoneNumber" placeholder="" className="text-white input" autoComplete="off" {...register("phoneNumber", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>Celular</span>
                </label>
                <label htmlFor="email" className="label">
                    <input type="email" id="email" placeholder="" className="text-white input" autoComplete="off" {...register("email", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>Email</span>
                </label>
                <div className="flex-row mt-3 flex gap-3 items-center justify-between p-4 col-start-1 col-end-3">
                    <div className="flex flex-col gap-2 h-full">
                        <label htmlFor="movie" className="text-white  font-[Tanker]">
                            Su Pelicula:
                        </label>
                        <select id="movie" className="w-fit" {...register("movie")}>
                            {BillBoards.map(BillBoard => <option className="text-black" value={BillBoard.Movie.name}>{BillBoard.Movie.name}</option>)}
                        </select>
                    </div>
                    <button className="flex flex-row gap-2 text-sm shadow-xl w-fit items-center bg-white rounded-full text-black p-3 pl-5 pr-5"><span className="">Reservar</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-journal-check" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                    </svg></button>
                </div>
            </form>
        </div>
    )
}