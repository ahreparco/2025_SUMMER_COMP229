import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEducation } from '../../api/education'

export default function EducationForm() {
  const [form, setForm] = useState({
    school: '',
    degree: '',
    year: '',
    error: '',
  })
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value, error: '' }))

  const handleSubmit = async e => {
    e.preventDefault()
    // validation
    if (!/^\d{4}$/.test(form.year)) {
      return setForm(f => ({ ...f, error: 'Year must be four digits' }))
    }

    setSaving(true)
    const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
    const data = await createEducation(auth.token, {
      school: form.school,
      degree: form.degree,
      year: form.year,
    })
    setSaving(false)

    if (data.error) {
      setForm(f => ({ ...f, error: data.error }))
    } else {
      navigate('/education')
    }
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>New Education</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}
      >
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
          placeholder="Year (e.g. 2023)"
          style={{ padding: '0.5rem' }}
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '0.5rem',
            fontWeight: 'bold',
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? 'Saving…' : 'Create'}
        </button>

        {form.error && <p style={{ color: 'red' }}>{form.error}</p>}
      </form>
    </main>
  )
}