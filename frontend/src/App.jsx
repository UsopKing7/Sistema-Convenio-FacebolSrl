import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Sucursales } from './pages/Sucursales'
import { Convenios } from './pages/Convenios'
import { Tarjetas } from './pages/Tarjetas'
import { Usuario } from './pages/Usuario'
import './styles/404.css'
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
          path="/dashboard/convenios/:id"
          element={
            <PrivateRouter>
              <Convenios />
            </PrivateRouter>
          }
        />
        <Route
        path='/dashboard/tarjetas/:id'
        element={
          <PrivateRouter>
            <Tarjetas />
          </PrivateRouter>
        }
        />
        <Route
          path="/dashboard/usuario/:id"
          element={
            <PrivateRouter>
              <Usuario />
            </PrivateRouter>
          }
        />
        <Route
          path="*"
          element={
            <div className='error-404'>
              <h1>404 Not Found</h1>
              <p>La página que buscas no existe.</p>
              <p>Regresa a la <a href="./">página de inicio</a>.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
