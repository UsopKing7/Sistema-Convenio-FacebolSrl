import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config.js'

export const DeleteEmpresa = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const deleteEmpresa = async () => {
    const res = await fetch(`${BASE_URL}/deleteEmpresa/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    if (res.ok) {
      alert('Empresa eliminada correctamente')
      navigate(-1)
    } else {
      throw new Error('Error al eliminar la empresa')
    }
  }

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>¿Desea eliminar la empresa?</h2>
      <button onClick={(e) => { e.preventDefault(); deleteEmpresa() }}>si</button>
      <button onClick={volver}>no</button>
    </form>
  )
}
