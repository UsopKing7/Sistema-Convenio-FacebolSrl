import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdateSucursales = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nombre_sede, setNombreSede] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [direccion, setDirreccion] = useState('')
  const [horario, setHorario] = useState('')
  const [estado, setEstado] = useState(null)

  useEffect(() => {
    const fetchSucursal = async () => {
      const res = await fetch(`http://localhost:3333/sucursal/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok) {
        setNombreSede(data.nombre_sede || '')
        setCiudad(data.ciudad || '')
        setDepartamento(data.departamento || '')
        setDirreccion(data.direccion || '')
        setHorario(data.horario || '')
        setEstado(Number(data.estado))
      } else {
        alert(data.message || 'No se puede obtener los datos de la sucursal')
      }
    }
    fetchSucursal()
  }, [id])

  const updateSucursal = async (e) => {
    e.preventDefault()

    const res = await fetch(`http://localhost:3333/updateSucursales/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        nombre_sede,
        ciudad,
        departamento,
        direccion,
        horario,
        estado: parseInt(estado)
      })
    })

    const data = await res.json()

    if (res.ok) {
      alert('Sucursal actualizada correctamente')
      navigate(-1)
    } else {
      alert(data.message || 'Error al actualizar la sucursla')
    }
  }

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form onSubmit={updateSucursal}>
      <h2>Sucursal a actualizar</h2>
      <div className="input-group">
        <label htmlFor="nombre Sede">Nombre Sede</label>
        <input
          type="text"
          placeholder="Nombre sede"
          value={nombre_sede}
          onChange={(e) => setNombreSede(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Ciudad">Ciudad</label>
        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Departamento">Departamento</label>
        <input
          type="text"
          placeholder="Departamento"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Dirrecion">Dirrecion</label>
        <input
          type="text"
          placeholder="Dirrecion"
          value={direccion}
          onChange={(e) => setDirreccion(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Horrario">Horario</label>
        <input
          type="text"
          placeholder="Horario"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Estado">Estado</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        >
          <option value="">Seleccionar estado</option>
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
      </div>
      <button type="submit">Actualizar</button>
      <button onClick={volver}>Volver</button>
    </form>
  )
}
