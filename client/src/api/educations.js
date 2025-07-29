/**
 * Fetch all education records
 */
export async function getEducation(token) {
  const res = await fetch('http://localhost:5000/api/educations', {
    headers: { Authorization: 'Bearer ' + token }
  })
  return res.json()
}

/**
 * Fetch a single record by id
 */
export async function getOneEducation(token, id) {
  const res = await fetch(`http://localhost:5000/api/educations/${id}`, {
    headers: { Authorization: 'Bearer ' + token }
  })
  return res.json()
}

/**
 * Create a new record
 */
export async function createEducation(token, record) {
  const res = await fetch('http://localhost:5000/api/educations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(record)
  })
  return res.json()
}

/**
 * Update an existing record
 */
export async function updateEducation(token, id, record) {
  const res = await fetch(`http://localhost:5000/api/educations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(record)
  })
  return res.json()
}

/**
 * Delete a record
 */
export async function deleteEducation(token, id) {
  const res = await fetch(`http://localhost:5000/api/educations/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token }
  })
  return res.json()
}
