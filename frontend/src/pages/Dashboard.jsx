import { useParams, useLocation } from 'react-router-dom'
import './Dashboard.css'

export const Dashboard = () => {
  const { _id } = useParams()
  const location = useLocation()
  const { nombre_empresa, correo } = location.state || {}

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar-circle">F</div>
          <h2>Empresa: {nombre_empresa}</h2>
          <p>Correo: {correo}</p>
        </div>
        <nav className="nav">
          <a href="">🏠 Inicio</a>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1>Dashboard del Usuario</h1>
        </header>

        <section className="stats">
        </section>

        <section className="charts">
        </section>
      </main>
    </div>
  )
}
