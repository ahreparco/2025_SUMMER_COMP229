/**
 * Fetch all projects
 */
export async function getProjects(token) {
  const res = await fetch('http://localhost:5000/api/projects', {
    headers: { Authorization: 'Bearer ' + token }
  })
  return res.json()
}

/**
 * Delete a single project by ID
 */
export async function deleteProject(token, id) {
  const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token }
  })
  return res.json()
}

/**
 * Create a new project
 */
export async function createProject(token, proj) {
  const res = await fetch('http://localhost:5000/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(proj)
  })
  return res.json()
}

/**
 * Fetch a single project by ID
 */
export async function getProject(token, id) {
  const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
    headers: { Authorization: 'Bearer ' + token }
  })
  return res.json()
}

/**
 * Update an existing project by ID
 */
export async function updateProject(token, id, data) {
  const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  })
  return res.json()
}