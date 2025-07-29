import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Nav() {
  const navigate = useNavigate()
  const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
  const isSignedIn = Boolean(auth.token)

  function handleLogout() {
    localStorage.removeItem('jwt')
    navigate('/signin')
  }

  return (
    <nav style={{ padding: '1rem', background: '#f5f5f5' }}>
      <Link to="/">Home</Link> {' | '}
      <Link to="/about">About</Link> {' | '}
      <Link to="/projects">Projects</Link> {' | '}
      <Link to="/services">Services</Link> {' | '}
      <Link to="/contact">Contact</Link> {' | '}
      <Link to="/educations">Education</Link>
      {isSignedIn && (
        <>
          {' | '}
          <Link to="/projects/new">Add Project</Link>
          {' | '}
          <Link to="/educations/new">Add Education</Link>
          {' | '}
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
            Logout
          </button>
        </>
      )}
      {!isSignedIn && (
        <>
          {' | '}
          <Link to="/signup">Sign Up</Link> {' | '}
          <Link to="/signin">Sign In</Link>
        </>
      )}
    </nav>
  )
}