import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import { BASE_URL } from '../config.js'

export const CrearEmpresa = () => {
  const [nombre_empresa, setNombreEmpresa] = useState('')
  const [representante, setRepresentante] = useState('')
  const [celular, setCelular] = useState('')
  const [correo, setCorreo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [nit, setNit] = useState('')
  const [facebook, setFacebook] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [longitud, setLongitud] = useState('')
  const [altitud, setAltitud] = useState('')
  const navigate = useNavigate()

  const crearEmpresa = async (e) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/empresas`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        nombre_empresa,
        representante,
        celular,
        correo,
        descripcion,
        nit,
        facebook,
        linkedin,
        tiktok,
        longitud,
        altitud
      })
    })

    const data = await res.json()

    if (res.ok) {
      navigate(-1)
    } else {
      alert(data.message || 'Error al crear la empresa')
    }
  }

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form onSubmit={crearEmpresa}>
      <h2>Datos de la nueva empresa</h2>
      <div className="input-group">
        <label htmlFor="Nombre empresa">Nombre empresa</label>
        <input
          type="text"
          placeholder="nombre de la empresa"
          value={nombre_empresa}
          onChange={(e) => setNombreEmpresa(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Representante">Representante</label>
        <input
          type="text"
          placeholder="nombre del representante"
          value={representante}
          onChange={(e) => setRepresentante(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Celular">Celular</label>
        <input
          type="text"
          placeholder="Celular"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Correo electronico">Correo Electronico</label>
        <input
          type="text"
          placeholder="correo electronico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Descripciòn">Descripciòn de la empresa</label>
        <input
          type="text"
          placeholder="descripcion de la empresa"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Nit de la empresa">Nit de la empresa</label>
        <input
          type="text"
          placeholder="nit de la empresa"
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Url Facebook">Red social Facebook</label>
        <input
          type="text"
          placeholder="Url de Facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Linkedin">Red social Linkedin</label>
        <input
          type="text"
          placeholder="Url de Linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Url TikTok">Red social TikTok</label>
        <input
          type="text"
          placeholder="Url de Tiktok"
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Longitud">Coordenadas de Longitud</label>
        <input
          type="text"
          placeholder="longitud"
          value={longitud}
          onChange={(e) => setLongitud(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Latitud">Coordenadas de Latitud</label>
        <input
          type="text"
          placeholder="latitud"
          value={altitud}
          onChange={(e) => setAltitud(e.target.value)}
          required
        />
      </div>
      <button type="submit">Registrar Empresa</button>
      <button onClick={volver}>Volver</button>
    </form>
  )
}
