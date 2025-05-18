import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const CrearConvenio = () => {
  const { id } = useParams()
  const [estado, setEstado] = useState()
  const [folio, setFolio] = useState()
  const [folio_interno, setFolioInterno] = useState()
  const [modalidad, setModalidad] = useState()
  const [presupuesto, setPresupuesto] = useState()
  const navigate = useNavigate()

  const crearConvenio = async (e) => {
    e.preventDefault()

    const res = await fetch(`http://localhost:3333/convenios/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        folio,
        folio_interno,
        modalidad,
        presupuesto: parseFloat(presupuesto),
        estado
      })
    })

    const data = await res.json()

    if (res.ok) {
      alert('Convenio creado correctamente')
      navigate(-1)
    } else {
      alert(data.message || 'Error al crear el convenio')
    }
  }

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form onSubmit={crearConvenio}>
      <h2>Datos del convenio</h2>
      <div className="input-group">
        <label htmlFor="Folio">Folio</label>
        <input
          type="text"
          placeholder="Folio"
          value={folio}
          onChange={(e) => setFolio(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Folio Interno">Folio Interno</label>
        <input
          type="text"
          placeholder="Folio Interno"
          value={folio_interno}
          onChange={(e) => setFolioInterno(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Presupuesto">Presupuesto</label>
        <input
          type="number"
          step='any'
          placeholder="Presupuesto Ej: 100.00"
          value={presupuesto}
          onChange={(e) => setPresupuesto(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Modalidad">Modalidad</label>
        <input
          type="text"
          placeholder="Modalidad"
          value={modalidad}
          onChange={(e) => setModalidad(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Estado">Estado</label>
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        />
      </div>
      <button type="submit">Registrar Convenio</button>
      <button onClick={volver}>Volver</button>
    </form>
  )
}
