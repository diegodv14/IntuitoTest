import { useForm } from "react-hook-form"
import { useStore } from "zustand"
import { useReservationStore } from "../context/ReservationContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export type FormValues = {
    name: string
    lastName: string
    documentNumber: string
    age: number
    phoneNumber: string
    email: string
}


export const FormReserva: React.FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const { customer, setCustomer } = useStore(useReservationStore)

    const navigate = useNavigate()

    const newBooking = (data: FormValues) => {
        setCustomer(data)
    }

    useEffect(() => {
        if (customer.age > 0 && customer.name !== "" && customer.documentNumber !== "" && customer.email !== "" && customer.lastName !== "" && customer.phoneNumber !== "") {
            navigate('/booking')
        }
    }, [customer])

    return (
        <div className="flex flex-col gap-3 items-center">
            <h1 className="text-2xl text-white font-[Tanker]">Registrate para realizar tu Reservación 🎞</h1>
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
                <div className="flex items-center justify-center mt-5 col-start-1 col-end-3">
                    <button className="flex flex-row gap-2 text-sm shadow-xl self-end w-fit items-center bg-white rounded-full text-black p-3 pl-5 pr-5"><span className="">Reservar</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-journal-check" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                    </svg></button>
                </div>
            </form>
        </div>
    )
}