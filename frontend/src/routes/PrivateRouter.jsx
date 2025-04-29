import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRouter = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    const verificar = async () => {
      try {
        const res = await fetch('http://localhost:3333/check-token', {
          method: 'GET',
          credentials: 'include'
        })

        setIsAuth(res.ok)
      } catch {
        setIsAuth(false)
      }
    }

    verificar()
  }, [])
  if (isAuth === null) return 
  return isAuth ? children : <Navigate to="/" />
}
