import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Sucursales } from './pages/Sucursales'
import { Convenios } from './pages/Convenios'
import { Usuario } from './pages/Usuario'
import { Empresas } from './pages/empresas'
import { CrearUsuario } from './pages/CrearUsuarios'
import { UpdateUsuario } from './pages/UpdateUsuario'
import { CrearEmpresa } from './pages/CrearEmpresa'
import { UpdateEmpresas } from './pages/UpdateEMpresas'
import { DeleteUsuario } from './pages/DeleteUsuarios'
import { DeleteEmpresa } from './pages/DeleteEmpresa'
import { CrearSucursal } from './pages/CrearSucursal'
import './styles/404.css'
import { PrivateRouter } from './routes/PrivateRouter'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRouter>
              <Dashboard />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/sucursales"
          element={
            <PrivateRouter>
              <Sucursales />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/convenios"
          element={
            <PrivateRouter>
              <Convenios />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/usuario"
          element={
            <PrivateRouter>
              <Usuario />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/empresas"
          element={
            <PrivateRouter>
              <Empresas />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/usuario/crearUsuario"
          element={
            <PrivateRouter>
              <CrearUsuario />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/usuario/editar/:id"
          element={
            <PrivateRouter>
              <UpdateUsuario />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/empresas/crearEmpresa"
          element={
            <PrivateRouter>
              <CrearEmpresa />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/empresas/UpdateEmpresas/:id"
          element={
            <PrivateRouter>
              <UpdateEmpresas />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/usuario/delete/:id"
          element={
            <PrivateRouter>
              <DeleteUsuario />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/empresas/deleteEmpresa/:id"
          element={
            <PrivateRouter>
              <DeleteEmpresa />
            </PrivateRouter>
          }
        />
        <Route
          path="/dashboard/empresas/agregar/sucursal/:id"
          element={
            <PrivateRouter>
              <CrearSucursal />
            </PrivateRouter>
          }
        />
        <Route
          path="*"
          element={
            <div className="error-404">
              <h1>404 Not Found</h1>
              <p>La página que buscas no existe.</p>
              <p>
                Regresa a la <a href="./">página de inicio</a>.
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
