import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminRoutes } from '../../Admin/AdminRoutes'

const PageContent = () => {
  return (
    <div>
      <AdminRoutes />
    </div>
  )
}

export default PageContent