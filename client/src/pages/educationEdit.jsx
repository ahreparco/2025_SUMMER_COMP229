import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOneEducation, updateEducation } from '../api/education'

export default function EducationEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ school: '', degree: '', year: '', error: '' })

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
    getOneEducation(auth.token, id).then(data => {
      if (!data.error) {
        setForm({ school: data.school, degree: data.degree, year: data.year, error: '' })
      }
    })
  }, [id])

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value, error: '' }))

  const handleSubmit = async e => {
    e.preventDefault()
    const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
    const data = await updateEducation(auth.token, id, {
      school: form.school,
      degree: form.degree,
      year: form.year
    })
    if (data.error) {
      setForm(f => ({ ...f, error: data.error }))
    } else {
      navigate('/education')
    }
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Edit Education</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
        <input
          name="school"
          value={form.school}
          onChange={handleChange}
          required
          placeholder="School"
          style={{ padding: '0.5rem' }}
        />
        <input
          name="degree"
          value={form.degree}
          onChange={handleChange}
          required
          placeholder="Degree"
          style={{ padding: '0.5rem' }}
        />
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          required
          placeholder="Year"
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem', fontWeight: 'bold' }}>
          Update
        </button>
        {form.error && <p style={{ color: 'red' }}>{form.error}</p>}
      </form>
    </main>
)
}