import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { PrivateRouter } from './routes/PrivateRouter'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route 
          path='/dashboard/:id'
          element={
            <PrivateRouter>
              <Dashboard />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
