import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    error: ''
  })
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value, error: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      })
      const data = await res.json()
      if (!res.ok) {
        setForm(f => ({ ...f, error: data.message }))
      } else {
        localStorage.setItem('jwt', JSON.stringify(data))
        navigate('/education')
      }
    } catch {
      setForm(f => ({ ...f, error: 'Network error' }))
    }
  }

  return (
    <main style={{ padding: '1rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email"
          style={{ padding: '0.5rem' }}
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem', fontWeight: 'bold' }}>
          Log In
        </button>
      </form>
      {form.error && <p style={{ color: 'red', marginTop: '1rem' }}>{form.error}</p>}
    </main>
  )
}