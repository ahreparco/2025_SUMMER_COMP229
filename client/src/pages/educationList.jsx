import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEducation, deleteEducation } from '../api/education'

export default function EducationList() {
  // null means “not loaded yet”
  const [items, setItems] = useState(null)
  const auth = JSON.parse(localStorage.getItem('jwt') || '{}')
  const isAdmin = auth.user?.role === 'Admin'
  const navigate = useNavigate()

  useEffect(() => {
    getEducation(auth.token)
      .then(data => {
        if (!data.error) {
          setItems(data)
        } else {
          setItems([])  // on error show empty list
        }
      })
  }, [])

  // while items is null show loading text
  if (items === null) {
    return (
      <main style={{ padding: '1rem' }}>
        <p>Loading education…</p>
      </main>
    )
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Education</h1>
      {isAdmin && (
        <button onClick={() => navigate('/education/new')}>
          New Education
        </button>
      )}
      {items.length === 0 ? (
        <p>No records found</p>
      ) : (
        <ul>
          {items.map(e => (
            <li key={e._id}>
              <strong>{e.school}</strong> – {e.degree} ({e.year})
              {isAdmin && (
                <>
                  <button onClick={() => navigate(`/education/${e._id}/edit`)}>
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      await deleteEducation(auth.token, e._id)
                      setItems(items.filter(x => x._id !== e._id))
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