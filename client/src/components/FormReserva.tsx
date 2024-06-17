import { useForm } from "react-hook-form"
import { useStore } from "zustand"
import { useReservationStore } from "../context/ReservationContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export type FormValues = {
    name: string
    lastname: string
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
        if (customer.age > 0 && customer.name !== "" && customer.documentNumber !== "" && customer.email !== "" && customer.lastname !== "" && customer.phoneNumber !== "") {
            navigate('/booking')
        }
    }, [customer])

    return (
        <div className="flex flex-col gap-3 mt-12 items-center">
            <h1 className="text-2xl text-white font-[Tanker]">Registrate para realizar tu Reservación 🎞</h1>
            <form onSubmit={handleSubmit(newBooking)} className="w-full grid grid-cols-2 p-5 h-[80%] items-center justify-end gap-8 rounded-lg text-white">
                <label htmlFor="name" className="label">
                    <input type="text" id="name" placeholder="" className="text-white input" autoComplete="off" {...register("name", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>Nombre</span>
                    {errors?.name?.type === "required" && <span className='text-[10px] ml-10 text-red-700 pt-2 error'>Debes ingresar un nombre</span>}
                </label>
                <label htmlFor="lastname" className="label">
                    <input type="text" id="lastname" placeholder="" className="text-white input" autoComplete="off" {...register("lastname", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>Apellido</span>
                    {errors?.lastname?.type === "required" && <span className='text-[10px] ml-10 text-red-700 pt-2 error'>Debes ingresar un apellido</span>}
                </label>
                <label htmlFor="documentNumber" className="label">
                    <input type="text" id="documentNumber" placeholder="" className="text-white input" autoComplete="off" {...register("documentNumber", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>C.I</span>
                    {errors?.documentNumber?.type === "required" && <span className='text-[10px] ml-10 text-red-700 pt-2 error'>Debes ingresar tu cedula</span>}

                </label>
                <label htmlFor="age" className="label">
                    <input type="number" id="age" placeholder="" className="text-white input" autoComplete="off" {...register("age", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>Edad</span>
                    {errors?.age?.type === "required" && <span className='text-[10px] ml-10 text-red-700 pt-2 error'>Debes ingresar tu edad</span>}

                </label>
                <label htmlFor="phoneNumber" className="label">
                    <input type="text" id="phoneNumber" placeholder="" className="text-white input" autoComplete="off" {...register("phoneNumber", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>Celular</span>
                    {errors?.phoneNumber?.type === "required" && <span className='text-[10px] ml-10 text-red-700 pt-2 error'>Debes ingresar un celular</span>}

                </label>
                <label htmlFor="email" className="label">
                    <input type="email" id="email" placeholder="" className="text-white input" autoComplete="off" {...register("email", { required: true })} />
                    <span className="label_name" style={{ userSelect: "none" }}>Email</span>
                    {errors?.email?.type === "required" && <span className='text-[10px] ml-10 text-red-700 pt-2 error'>Debes ingresar un correo</span>}

                </label>
                <div className="flex items-center justify-center mt-5 col-start-1 col-end-3">
                    <button className="flex flex-row gap-2 text-sm shadow-xl self-end w-fit items-center bg-white rounded-full text-black p-3 pl-5 pr-5"><span className="">Registrarme</span><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg></button>
                </div>
            </form>
        </div>
    )
}