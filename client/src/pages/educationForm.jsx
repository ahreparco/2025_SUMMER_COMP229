// FILE: educationForm.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createEducation, getOneEducation, updateEducation } from '../api/education'

export default function EducationForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [form, setForm] = useState({
    school: '',
    degree: '',
    year: '',
    error: '',
    loading: isEdit
  })

  useEffect(() => {
    if (!id) return
    const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
    ;(async () => {
      try {
        const data = await getOneEducation(auth.token, id)
        if (data.error) throw new Error(data.error)
        setForm({
          school: data.school,
          degree: data.degree,
          year: data.year,
          error: '',
          loading: false
        })
      } catch (err) {
        setForm(prev => ({ ...prev, error: err.message, loading: false }))
      }
    })()
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value, error: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
    const { school, degree, year } = form
    try {
      const data = isEdit
        ? await updateEducation(auth.token, id, { school, degree, year })
        : await createEducation(auth.token, { school, degree, year })
      if (data.error) throw new Error(data.error)
      navigate('/education')
    } catch (err) {
      setForm(prev => ({ ...prev, error: err.message }))
    }
  }

  if (form.loading) {
    return (
      <main style={{ padding: '1rem' }}>
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>{isEdit ? 'Edit Education' : 'Add Education'}</h1>
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
          {isEdit ? 'Update' : 'Add'}
        </button>
        {form.error && <p style={{ color: 'red' }}>{form.error}</p>}
      </form>
    </main>
  )
}