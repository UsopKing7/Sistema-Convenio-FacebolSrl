import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const CrearSucursal = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nombre_sede, setNombre_sede] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [direccion, setDireccion] = useState('')
  const [horario, setHorario] = useState('')

  const crearSucursal = async (e) => {
    e.preventDefault()

    const res = await fetch(`http://localhost:3333/sucursales/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        nombre_sede,
        ciudad,
        departamento,
        direccion,
        horario
      })
    })

    const data = await res.json()

    if (res.ok) {
      navigate(-1)
    } else {
      alert(data.message || 'Error al crear el Usuario')
    }
  }

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form onSubmit={crearSucursal}>
      <h2>Datos de la sucursal</h2>
      <div className="input-group">
        <label htmlFor="nombre_sede">Nombre de la sede</label>
        <input
          id="nombre_sede"
          type="text"
          placeholder="Nombre de la sede"
          value={nombre_sede}
          onChange={(e) => setNombre_sede(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="ciudad">Ciudad</label>
        <input
          id="ciudad"
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="departamento">Nombre del departamento</label>
        <input
          id="departamento"
          type="text"
          placeholder="Nombre del departamento"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="direccion">Dirección Sucursal</label>
        <input
          id="direccion"
          type="text"
          placeholder="Dirección Sucursal"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="horario">Horario</label>
        <input
          id="horario"
          type="text"
          placeholder="Horario"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          required
        />
      </div>
      <button type="submit">Registrar Sucursal</button>
      <button onClick={volver}>Volver</button>
    </form>
  )
}
