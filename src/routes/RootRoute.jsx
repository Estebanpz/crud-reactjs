import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function RootRoute() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return <Navigate to="/login" replace />
}
