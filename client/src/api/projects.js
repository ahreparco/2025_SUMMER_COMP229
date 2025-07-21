export function getProjects(token) {
  return fetch('http://localhost:5000/api/projects', {
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => res.json())
}

export function deleteProject(token, id) {
  return fetch(`http://localhost:5000/api/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => res.json())
}

export function createProject(token, proj) {
  return fetch('http://localhost:5000/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(proj)
  }).then(res => res.json())
}

export function getProject(token, id) {
  return fetch(`http://localhost:5000/api/projects/${id}`, {
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => res.json())
}

export function updateProject(token, id, data) {
  return fetch(`http://localhost:5000/api/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}