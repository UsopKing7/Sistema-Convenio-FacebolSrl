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
      <input
        type="text"
        placeholder="Nombre de la sede"
        value={nombre_sede}
        onChange={(e) => setNombre_sede(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nombre del departamento"
        value={departamento}
        onChange={(e) => setDepartamento(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Direccion Sucursal"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Horario"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
        required
      />
      <br />
      <button type="submit">Registrar Sucursal</button>
      <button onClick={volver}>Volver</button>
    </form>
  )
}
