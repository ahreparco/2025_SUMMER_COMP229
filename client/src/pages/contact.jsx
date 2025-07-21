import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    error: '',
    success: false
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value, error: '', success: false }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const token = JSON.parse(localStorage.getItem('jwt'))?.token
    if (!token) {
      setForm(prev => ({ ...prev, error: 'You must be signed in' }))
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      })
      const data = await res.json()
      if (!res.ok) {
        setForm(prev => ({ ...prev, error: data.error || 'Submission failed' }))
      } else {
        setForm({ name: '', email: '', message: '', error: '', success: true })
      }
    } catch {
      setForm(prev => ({ ...prev, error: 'Network error' }))
    }
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Contact Me</h1>
      <h2>email: dchen137@my.centennialcollege.ca</h2>
      <h2>cell: 647 781 3532</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </label>

        <label>
          Message:
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </label>

        <button type="submit" style={{ padding: '0.5rem', fontWeight: 'bold' }}>
          Send
        </button>

        {form.error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{form.error}</p>}
        {form.success && <p style={{ color: 'green', marginTop: '0.5rem' }}>Message sent successfully</p>}
      </form>
    </main>
)
}