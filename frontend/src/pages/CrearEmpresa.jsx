import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

export const CrearEmpresa = () => {
  const [nombre_empresa, setNombreEmpresa] = useState('')
  const [representante, setRepresentante] = useState('')
  const [celular, setCelular] = useState('')
  const [correo, setCorreo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [nit, setNit] = useState('')
  const navigate = useNavigate()

  const crearEmpresa = async (e) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3333/empresas', {
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
        nit
      })
    })

    const data = await res.json()

    if (res.ok) {
      navigate(-1)
    } else {
      alert(data.message || 'Error al crear la empresa')
    }
  }

  return (
    <form onSubmit={crearEmpresa}>
      <h2>Datos de la nueva empresa</h2>
      <input
        type="text"
        placeholder="nombre de la empresa"
        value={nombre_empresa}
        onChange={(e) => setNombreEmpresa(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="nombre del representante"
        value={representante}
        onChange={(e) => setRepresentante(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="telefono"
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="correo electronico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="descripcion de la empresa"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      ></input>{' '}
      <input
        type="text"
        placeholder="nit de la empresa"
        value={nit}
        onChange={(e) => setNit(e.target.value)}
        required
      ></input>
      <button type='submit'>Registrar Empresa</button>
    </form>
  )
}
