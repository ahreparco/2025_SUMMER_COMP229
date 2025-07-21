import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProject } from '../../api/projects'

export default function ProjectForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    link: '',
    error: ''
  })
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value, error: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // simple validation
    if (!form.title.trim()) {
      return setForm(f => ({ ...f, error: 'Title cannot be blank' }))
    }
    if (!form.description.trim()) {
      return setForm(f => ({ ...f, error: 'Description cannot be blank' }))
    }

    setSaving(true)
    const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
    const data = await createProject(auth.token, {
      title: form.title.trim(),
      description: form.description.trim(),
      link: form.link.trim()
    })
    setSaving(false)

    if (data.error) {
      setForm(f => ({ ...f, error: data.error }))
    } else {
      navigate('/projects')
    }
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>New Project</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxWidth: '400px'
        }}
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Title"
          style={{ padding: '0.5rem' }}
        />
        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          required
          placeholder="Description"
          style={{ padding: '0.5rem' }}
        />
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Link optional"
          style={{ padding: '0.5rem' }}
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '0.5rem',
            fontWeight: 'bold',
            opacity: saving ? 0.6 : 1
          }}
        >
          {saving ? 'Saving...' : 'Create Project'}
        </button>

        {form.error && (
          <p style={{ color: 'red', marginTop: '0.5rem' }}>{form.error}</p>
        )}
      </form>
    </main>
  )
}