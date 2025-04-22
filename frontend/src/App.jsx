import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Sucursales } from './pages/Sucursales'
import { Convenios } from './pages/Convenios'
import { PrivateRouter } from './routes/PrivateRouter'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard/:id"
          element={
            <PrivateRouter>
              <Dashboard />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/sucursales/:id"
          element={
            <PrivateRouter>
              <Sucursales />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/convenios/:is"
          element={
            <PrivateRouter>
              <Convenios />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
