import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProject, updateProject } from '../api/projects'

export default function ProjectEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [proj, setProj] = useState({
    title: '',
    description: '',
    link: '',
    error: ''
  })

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
    getProject(auth.token, id).then(data => {
      if (!data.error) {
        setProj({
          title: data.title,
          description: data.description,
          link: data.link || '',
          error: ''
        })
      }
    })
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setProj(prev => ({ ...prev, [name]: value, error: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
    const data = await updateProject(auth.token, id, {
      title: proj.title,
      description: proj.description,
      link: proj.link
    })
    if (data.error) {
      setProj(prev => ({ ...prev, error: data.error }))
    } else {
      navigate('/projects')
    }
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Edit Project</h1>
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
          Update
        </button>
        {proj.error && <p style={{ color: 'red' }}>{proj.error}</p>}
      </form>
    </main>
  )
}