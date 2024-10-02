import React from 'react'
import { Header } from '../components/Admin/Header'
import PageContent from '../components/Admin/PageContent'
import Footer from '../components/Admin/Footer'
import SideMenu from '../components/Admin/SideMenu'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Header />
        <div className='flex flex-1 mt-4 p-4'>
            <SideMenu className="w-1/4" />
            <div className='flex-1'>
              <PageContent />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Dashboard