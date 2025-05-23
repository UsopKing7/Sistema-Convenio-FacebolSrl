import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config.js'

export const DeleteConvenios = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const deleteConvenio = async () => {
    const res = await fetch(`${BASE_URL}/deleteConvenios/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include'
    })

    if (res.ok) {
      alert('Convenio eliminado')
      navigate(-1)
    }
  }
  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form onChange={(e) => e.preventDefault()}>
      <h2>¿Desea eliminar este convenio?</h2>
      <button
        onClick={(e) => {
          e.preventDefault()
          deleteConvenio()
        }}
      >
        si
      </button>
      <button onClick={volver}>no</button>
    </form>
  )
}
