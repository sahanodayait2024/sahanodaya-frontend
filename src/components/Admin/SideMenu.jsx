import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu
    onClick={({key})=>{
      navigate(key)
    }}
      items={[
        {
          label:"Panel",
          key:"/admin/dashboard/panel"
        },
        {
          label:"Bookings",
          key:"/admin/dashboard/bookings",
        },
        {
          label:"Courses",
          key:"/admin/dashboard/courses",
        },
        {
          label:"Ongoin Projects",
          key:"/admin/dashboard/ongoing-projects",
        },
        {
          label:"Past Projects",
          key:"/admin/dashboard/past-projects",
        },
      ]}
    >

    </Menu>
  )
}

export default SideMenu