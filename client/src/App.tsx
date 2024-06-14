import { Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/DashBoard"
import { BillBoardProvider } from "./context/BillBoardContext"

function App() {

  return (
    <BillBoardProvider>
      <Routes>
        <Route index element={<Dashboard />} />
      </Routes>
    </BillBoardProvider>
  )
}

export default App
