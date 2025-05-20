import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdateConvenio = () => {
  const { id } = useParams()
  const [folio, setFolio] = useState('')
  const [folio_interno, setFolioInterno] = useState('')
  const [modalidad, setModalidad] = useState('')
  const [presupuesto, setPresupuesto] = useState('')
  const [estado, setEstado] = useState('activo')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchConvenio = async () => {
      const res = await fetch(`http://localhost:3333/convenio/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok) {
        setFolio(data.folio || '')
        setFolioInterno(data.folio_interno || '')
        setModalidad(data.modalidad || '')
        setPresupuesto(data.presupuesto || '')
        setEstado(data.estado || '')
      }
    }
    fetchConvenio()
  }, [id])

  const updateConvenio = async (e) => {
    e.preventDefault()

    const res = await fetch(`http://localhost:3333/updateConvenios/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
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

    if (res.ok) {
      alert('Convenio actualizado correctamente')
      navigate(-1)
    } else {
      alert('Error al actualizar el convenio')
    }
  }

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form onSubmit={updateConvenio}>
      <h2>Actualizar Convenio</h2>
      <div className="input-group">
        <label htmlFor="Folio">Folio</label>
        <input
          type="text"
          placeholder="folio"
          value={folio}
          onChange={(e) => setFolio(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Folio_interno">Folio Interno</label>
        <input
          type="text"
          placeholder="folio interno"
          value={folio_interno}
          onChange={(e) => setFolioInterno(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Modalidad">Modalidad</label>
        <input
          type="text"
          placeholder="modalidad"
          value={modalidad}
          onChange={(e) => setModalidad(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="presupuesto">Presupuesto</label>
        <input
          type="text"
          placeholder="Presupuesto"
          value={presupuesto}
          onChange={(e) => setPresupuesto(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Estado">Estado</label>
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
      </div>
      <button type="submit">Actualizar</button>
      <button onClick={volver}>Volver</button>
    </form>
  )
}
