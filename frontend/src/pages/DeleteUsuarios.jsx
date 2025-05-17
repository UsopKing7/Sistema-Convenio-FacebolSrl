import { useParams, useNavigate } from 'react-router-dom'

export const DeleteUsuario = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const deleteUsuario = async () => {
    const res = await fetch(`http://localhost:3333/usuariosDelete/${id}`, {
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
