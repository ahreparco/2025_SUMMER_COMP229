// Create one contact
export function createContact(token, data) {
  return fetch('/api/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}

// Read all contacts
export function getContacts(token) {
  return fetch('/api/contacts', {
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => res.json())
}

// Read one by id
export function getContact(token, id) {
  return fetch(`/api/contacts/${id}`, {
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => res.json())
}

// Update one
export function updateContact(token, id, data) {
  return fetch(`/api/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}

// Delete one
export function deleteContact(token, id) {
  return fetch(`/api/contacts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + token }
  }).then(res => res.json())
}