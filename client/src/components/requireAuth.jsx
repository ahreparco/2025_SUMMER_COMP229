import { Navigate } from 'react-router-dom'

export default function requireAuth({ children }) {
  const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
  if (!auth.token) {
    return <Navigate to="/signin" replace />
  }
  return children
}
