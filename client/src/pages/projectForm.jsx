// FILE: projectForm.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createProject, getProject, updateProject } from '../api/projects'

export default function ProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [proj, setProj] = useState({
    title: '',
    description: '',
    link: '',
    error: '',
    loading: isEdit
  })

  useEffect(() => {
    if (!id) return
    const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
    ;(async () => {
      try {
        const data = await getProject(auth.token, id)
        if (data.error) throw new Error(data.error)
        setProj({
          title: data.title,
          description: data.description,
          link: data.link || '',
          error: '',
          loading: false
        })
      } catch (err) {
        setProj(prev => ({ ...prev, error: err.message, loading: false }))
      }
    })()
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setProj(prev => ({ ...prev, [name]: value, error: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
    const { title, description, link } = proj
    try {
      const data = isEdit
        ? await updateProject(auth.token, id, { title, description, link })
        : await createProject(auth.token, { title, description, link })
      if (data.error) throw new Error(data.error)
      navigate('/projects')
    } catch (err) {
      setProj(prev => ({ ...prev, error: err.message }))
    }
  }

  if (proj.loading) {
    return (
      <main style={{ padding: '1rem' }}>
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>{isEdit ? 'Edit Project' : 'Add Project'}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
        <input
          name="title"
          value={proj.title}
          onChange={handleChange}
          required
          placeholder="Title"
          style={{ padding: '0.5rem' }}
        />
        <textarea
          name="description"
          rows="4"
          value={proj.description}
          onChange={handleChange}
          required
          placeholder="Description"
          style={{ padding: '0.5rem' }}
        />
        <input
          name="link"
          value={proj.link}
          onChange={handleChange}
          placeholder="Link (optional)"
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem', fontWeight: 'bold' }}>
          {isEdit ? 'Update' : 'Add'}
        </button>
        {proj.error && <p style={{ color: 'red' }}>{proj.error}</p>}
      </form>
    </main>
  )
}