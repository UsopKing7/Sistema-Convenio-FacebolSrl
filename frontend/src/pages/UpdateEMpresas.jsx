import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const UpdateEmpresas = () => {
  const { id } = useParams('')
  const [descripcion, setDescripcion] = useState('')
  const [facebook, setFacebook] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [tiktok, setTiktok] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEmpresa = async () => {
      const res = await fetch(`http://localhost:3333/empresaUnica/${id}`, {
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

    const res = await fetch(`http://localhost:3333/updateEmpresa/${id}`, {
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
      <p>Descripcion</p>
      <input
        type="text"
        placeholder="Descripcion"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      ></input>
      <p>Facebook Url</p>
      <input
        type="text"
        placeholder="Facebook URL"
        value={facebook}
        onChange={(e) => setFacebook(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="Linkedin URL"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="Tiktok"
        value={tiktok}
        onChange={(e) => setTiktok(e.target.value)}
        required
      ></input>
      <button type='submit'>Actualizar</button>
      <button onClick={volver}>Volver</button>
    </form>
  )
}
