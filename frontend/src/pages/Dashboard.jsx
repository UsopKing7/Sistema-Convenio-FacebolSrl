import { useParams } from 'react-router-dom'

export const Dashboard = () => {
  const { id } = useParams()
  return (
    <div>
      <h1>Dashboard</h1>
      <p>id {id}</p>
    </div>
  )
}
