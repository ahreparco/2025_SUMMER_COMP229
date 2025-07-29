// FILE: auth.middleware.js (server-side JWT validation)
import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

// ensure request has a valid token
export function requireSignin(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }
  const token = header.split(' ')[1]
  try {
    req.auth = jwt.verify(token, config.jwtSecret)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// only allow Admin role
export function isAdmin(req, res, next) {
  if (req.auth.role.toLowerCase() !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}