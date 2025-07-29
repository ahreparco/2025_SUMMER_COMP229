// server/routes/api.routes.js

import express from 'express'
import Contact   from '../models/contactModel.js'
import Project   from '../models/projectModel.js'
import Education from '../models/educationModel.js'
import User      from '../models/userModel.js'
import { requireSignin, isAdmin } from '../helpers/auth.middleware.js'

const router = express.Router()

// helper to wrap async routes & forward errors
const asyncHandler = fn =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)

//
// CONTACT ROUTES (protected, admins can create/update/delete)
//
router.get(
  '/contacts',
  requireSignin,
  asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
    res.json(contacts)
  })
)

router.get(
  '/contacts/:id',
  requireSignin,
  asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ message: 'Not found' })
    res.json(contact)
  })
)

router.post(
  '/contacts',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    console.log('📥 createContact', req.body)
    const saved = await new Contact(req.body).save()
    res.status(201).json(saved)
  })
)

router.put(
  '/contacts/:id',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  })
)

router.delete(
  '/contacts/:id',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ message: 'Contact removed' })
  })
)

//
// PROJECT ROUTES (protected, anyone signed in can list, only admins can mutate)
//
router.get(
  '/projects',
  requireSignin,
  asyncHandler(async (req, res) => {
    const items = await Project.find()
    res.json(items)
  })
)

router.get(
  '/projects/:id',
  requireSignin,
  asyncHandler(async (req, res) => {
    const item = await Project.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  })
)

router.post(
  '/projects',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    console.log('📥 createProject body:', req.body)
    const saved = await new Project(req.body).save()
    res.status(201).json(saved)
  })
)


router.put(
  '/projects/:id',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  })
)

router.delete(
  '/projects/:id',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Project removed' })
  })
)

//
// EDUCATION ROUTES (protected, anyone signed in can list, only admins can mutate)
//
router.get(
  '/educations',
  requireSignin,
  asyncHandler(async (req, res) => {
    const items = await Education.find()
    res.json(items)
  })
)

router.get(
  '/educations/:id',
  requireSignin,
  asyncHandler(async (req, res) => {
    const item = await Education.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  })
)

router.post(
  '/educations',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    console.log('📥 createEducation', req.body)
    const saved = await new Education(req.body).save()
    res.status(201).json(saved)
  })
)

router.put(
  '/educations/:id',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    const updated = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  })
)

router.delete(
  '/educations/:id',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    await Education.findByIdAndDelete(req.params.id)
    res.json({ message: 'Education removed' })
  })
)

//
// USER ROUTES (Admin only)
//
router.get(
  '/users',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find()
    res.json(users)
  })
)

router.get(
  '/users/:id',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'Not found' })
    res.json(user)
  })
)

router.post(
  '/users',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    console.log('📥 createUser', req.body)
    const saved = await new User(req.body).save()
    res.status(201).json(saved)
  })
)

router.put(
  '/users/:id',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  })
)

router.delete(
  '/users/:id',
  requireSignin,
  isAdmin,
  asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User removed' })
  })
)

export default router