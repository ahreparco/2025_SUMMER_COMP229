// Create one contact
export async function createContact(token, data) {
  const res = await fetch('/api/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  })
  return await res.json()
}

// Read all contacts
export async function getContacts(token) {
  const res = await fetch('/api/contacts', {
    headers: { Authorization: 'Bearer ' + token }
  })
  return await res.json()
}

// Read one by id
export async function getContact(token, id) {
  const res = await fetch(`/api/contacts/${id}`, {
    headers: { Authorization: 'Bearer ' + token }
  })
  return await res.json()
}

// Update one
export async function updateContact(token, id, data) {
  const res = await fetch(`/api/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  })
  return await res.json()
}

// Delete one
export async function deleteContact(token, id) {
  const res = await fetch(`/api/contacts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token }
  })
  return await res.json()
}