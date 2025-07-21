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
import EducationList from './pages/educationList.jsx'
import EducationForm from './components/forms/educationForm.jsx'
import EducationEdit from './pages/educationEdit.jsx'

// projects
import ProjectList from './pages/projectList.jsx'
import ProjectForm from './components/forms/projectForm.jsx'
import ProjectEdit from './pages/projectEdit.jsx'

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
        <Route
          path="/education"
          element={
            <RequireAuth>
              <EducationList />
            </RequireAuth>
          }
        />
        <Route
          path="/education/new"
          element={
            <RequireAuth>
              <EducationForm />
            </RequireAuth>
          }
        />
        <Route
          path="/education/:id/edit"
          element={
            <RequireAuth>
              <EducationEdit />
            </RequireAuth>
          }
        />

        {/* projects protected */}
        <Route
          path="/projects"
          element={
            <RequireAuth>
              <ProjectList />
            </RequireAuth>
          }
        />
        <Route
          path="/projects/new"
          element={
            <RequireAuth>
              <ProjectForm />
            </RequireAuth>
          }
        />
        <Route
          path="/projects/:id/edit"
          element={
            <RequireAuth>
              <ProjectEdit />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}