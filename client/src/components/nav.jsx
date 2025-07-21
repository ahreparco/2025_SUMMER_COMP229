import { Link, useNavigate } from 'react-router-dom'

export default function Nav() {
  const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
  const isSignedIn = !!auth.token
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    navigate('/signin')
  }

  return (
    <nav style={{ padding: '1rem', background: '#f5f5f5' }}>
      <Link to="/">Home </Link>{' '}
      <Link to="/about"> About </Link>{' '}
      <Link to="/projects"> Projects </Link>{' '}
      <Link to="/services"> Services </Link>{' '}
      <Link to="/contact"> Contact </Link>{' '}
      <Link to="/education"> Education</Link>{' '}
      {!isSignedIn && (
        <>
          <Link to="/signup"> Sign Up </Link>{' '}
          <Link to="/signin"> Sign In </Link>
        </>
      )}
      {isSignedIn && (
        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
          Logout
        </button>
      )}
    </nav>
  )
}
