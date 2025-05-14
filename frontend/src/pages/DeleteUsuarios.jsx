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
      <h1>¿Desea Eliminar el Usuario?</h1>
      <button onClick={volver}>no</button>
      <button onClick={deleteUsuario}>si</button>
    </form>
  )
}
