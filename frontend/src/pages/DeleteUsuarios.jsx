import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config.js'

export const DeleteUsuario = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const deleteUsuario = async () => {
    const res = await fetch(`${BASE_URL}/usuariosDelete/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    if (res.ok) {
      alert('Usuario eliminado correctamente')
      navigate(-1)
    } else {
      throw new Error('Error al eliminar el Usuario')
    }
  }

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form>
      <h2>¿Desea Eliminar el Usuario?</h2>
      <button onClick={deleteUsuario}>si</button>
      <button onClick={volver}>no</button>
    </form>
  )
}
