import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminPanel } from './AdminPanel'
import Bookings from './Bookings'
import Courses from './Courses'
import OngoProject from './OngoProject'
import PastProjects from './PastProjects'

export const AdminRoutes = () => {
  return (
    <Routes>
    <Route path="panel" element={<AdminPanel />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="courses" element={<Courses />} />
      <Route path="ongoing-projects" element={<OngoProject />} />
      <Route path="past-projects" element={<PastProjects />} />

    </Routes>
  )
}
