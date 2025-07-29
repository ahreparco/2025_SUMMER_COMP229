import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/nav.jsx'
import RequireAuth from './components/requireAuth.jsx'

// public pages
import Home    from './pages/home.jsx'
import About   from './pages/about.jsx'
import Service from './pages/service.jsx'
import Contact from './pages/contact.jsx'

// auth
import Signup  from './components/auth/signup.jsx'
import Signin  from './components/auth/signin.jsx'

// education
import Educations from './pages/educations.jsx'
import EducationForm from './pages/educationForm.jsx'

// projects
import Projects from './pages/projects.jsx'
import ProjectForm from './pages/projectForm.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* public */}
        <Route path="/"          element={<Home          />} />
        <Route path="/about"     element={<About         />} />
        <Route path="/services"  element={<Service       />} />
        <Route path="/contact"   element={<Contact       />} />
        <Route path="/signup"    element={<Signup        />} />
        <Route path="/signin"    element={<Signin        />} />

        {/* education protected */}
        <Route path="/educations" element={
          <RequireAuth>
            <Educations />
          </RequireAuth>
        } />
        <Route path="/educations/new" element={
          <RequireAuth>
            <EducationForm />
          </RequireAuth>
        } />
        <Route path="/educations/:id/edit" element={
          <RequireAuth>
            <EducationForm />
          </RequireAuth>
        } />

        {/* projects protected */}
        <Route path="/projects" element={
          <RequireAuth>
            <Projects />
          </RequireAuth>
        } />
        <Route path="/projects/new" element={
          <RequireAuth>
            <ProjectForm />
          </RequireAuth>
        } />
        <Route path="/projects/:id/edit" element={
          <RequireAuth>
            <ProjectForm />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  )
}