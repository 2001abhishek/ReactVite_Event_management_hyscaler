import React from 'react'
import Navbar from '../navbar/Navbar'

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content">
        {children}
      </div>
    </div>
  )
}

export default Layout