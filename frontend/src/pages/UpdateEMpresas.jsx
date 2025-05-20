import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { BASE_URL } from '../config.js'

export const UpdateEmpresas = () => {
  const { id } = useParams('')
  const [descripcion, setDescripcion] = useState('')
  const [facebook, setFacebook] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [tiktok, setTiktok] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEmpresa = async () => {
      const res = await fetch(`${BASE_URL}/empresaUnica/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok) {
        setDescripcion(data.descripcion || '')
        setFacebook(data.facebook || '')
        setLinkedin(data.linkedin || '')
        setTiktok(data.tiktok || '')
      }
    }
    fetchEmpresa()
  }, [id])

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const updateEmpresa = async (e) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/updateEmpresa/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        descripcion,
        facebook,
        linkedin,
        tiktok
      })
    })

    const data = await res.json()

    if (res.ok) {
      navigate(-1)
    } else {
      alert(data.message || 'Error al actualiar la empresa')
    }
  }
  return (
    <form onSubmit={updateEmpresa}>
      <h2>Datos a actualizar</h2>
      <div className="input-group">
        <label htmlFor="Descripcion">Descripcion de la empresa</label>
        <input
          type="text"
          placeholder="Descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Url Facebook">Url Facebook</label>
        <input
          type="text"
          placeholder="Facebook URL"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Linkedin Url">Url Linkedin</label>
        <input
          type="text"
          placeholder="Linkedin URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="TikTok Url">Url de TikTok</label>
        <input
          type="text"
          placeholder="Tiktok"
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
          required
        />
      </div>
      <button type="submit">Actualizar</button>
      <button onClick={volver}>Volver</button>
    </form>
  )
}
