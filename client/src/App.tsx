import { Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/DashBoard"
import { BillBoardProvider } from "./context/BillBoardContext"
import { Booking } from "./pages/Booking"
import { AdminCartelera } from "./components/AdminCartelera"
import { AdminButaca } from "./components/AdminButaca"

function App() {

  return (
    <BillBoardProvider>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/cartelera" element={<AdminCartelera />} />
        <Route path="/butaca" element={<AdminButaca />} />
      </Routes>
    </BillBoardProvider>
  )
}

export default App
