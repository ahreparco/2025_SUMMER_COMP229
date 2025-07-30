import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProjects, deleteProject } from '../api/projects'

export default function ProjectList() {
  const [items, setItems] = useState(null)
  const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
  const isAdmin = auth.user?.role === 'Admin'
  const navigate = useNavigate()

  useEffect(() => {
    getProjects(auth.token)
      .then(data => {
        if (!data.error) {
          setItems(data)
        } else {
          setItems([])
        }
      })
  }, [])

  if (items === null) {
    return (
      <main style={{ padding: '1rem' }}>
        <p>Loading projects…</p>
      </main>
    )
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Projects</h1>
      {isAdmin && (
        <button onClick={() => navigate('/projects/new')}>
          New Project
        </button>
      )}
      {items.length === 0 ? (
        <p>No records found</p>
      ) : (
        <ul>
          {items.map(p => (
            <li key={p._id}>
              <strong>{p.title}</strong>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: '0.5rem' }}
                >
                  View
                </a>
              )}
              {isAdmin && (
                <>
                  <button onClick={() => navigate(`/projects/${p._id}/edit`)}>
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      await deleteProject(auth.token, p._id)
                      setItems(items.filter(x => x._id !== p._id))
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}