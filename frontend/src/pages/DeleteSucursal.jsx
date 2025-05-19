import { useParams, useNavigate } from 'react-router-dom'

export const DeleteSucursal = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const deleteSucursal = async () => {
    const res = await fetch(`http://localhost:3333/sucursales/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    if (res.ok) {
      alert('Sucursal Eliminada Correctamente')
      navigate(-1)
    } else {
      alert(res.message || 'Error al Eliminar la Sucursal')
    }
  }

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Desea eliminar la sucursal</h2>
      <button
        onClick={(e) => {
          e.preventDefault()
          deleteSucursal()
        }}
      >
        si
      </button>
      <button onClick={volver}>no</button>
    </form>
  )
}
