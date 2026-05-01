import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/crops': 'Crop Management',
  '/farms': 'Farm Management',
  '/inventory': 'Inventory',
  '/sales': 'Sales Analytics',
  '/reports': 'Reports',
  '/settings': 'Settings'
}

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentPath = window.location.pathname
  const title = pageTitles[currentPath] || 'Dashboard'

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className={`transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <Navbar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
