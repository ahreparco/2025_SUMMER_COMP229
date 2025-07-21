export function getEducation(token) {
  return fetch('http://localhost:5000/api/education', {
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => res.json())
}

export function deleteEducation(token, id) {
  return fetch(`http://localhost:5000/api/education/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => res.json())
}

export function createEducation(token, edu) {
  return fetch('http://localhost:5000/api/education', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(edu)
  }).then(res => res.json())
}

export function getOneEducation(token, id) {
  return fetch(`http://localhost:5000/api/education/${id}`, {
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => res.json())
}

export function updateEducation(token, id, data) {
  return fetch(`http://localhost:5000/api/education/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}