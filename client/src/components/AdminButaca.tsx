import { useNavigate } from "react-router-dom"

export const AdminButaca = () => {

    const navigate = useNavigate()

    return (
        <section>
            <nav className="w-full p-6 font-[Tanker] flex items-center justify-between shadow-md">
                <h1 className="text-3xl title">Administras Butacas</h1>
                <button onClick={() => navigate('/')} title="Volver al Registro"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg></button>
            </nav>
        </section>
    )
}