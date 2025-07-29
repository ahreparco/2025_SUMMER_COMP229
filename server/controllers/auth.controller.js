import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import config from '../../config/config.js'

// Registers a new user: name, email, password → role defaults to 'User'
export async function signup(req, res) {
  const { name, email, password } = req.body
  if (await User.findOne({ email })) {
    return res.status(409).json({ message: 'Email already in use' })
  }
  const user = new User({ name, email, password })
  await user.save()
  res.status(201).json({ message: 'Signup success' })
}

// Authenticates existing user and returns JWT and user info
export async function signin(req, res) {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.authenticate(password))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: '2h' }
  )
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  })
}

// Signs out a user (client should drop the token)
export function signout(req, res) {
  res.json({ message: 'Signed out' })
}