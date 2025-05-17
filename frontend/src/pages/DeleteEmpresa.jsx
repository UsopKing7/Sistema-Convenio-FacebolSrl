import { useParams, useNavigate } from 'react-router-dom'

export const DeleteEmpresa = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const deleteEmpresa = async () => {
    const res = await fetch(`http://localhost:3333/deleteEmpresa/${id}`, {
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
