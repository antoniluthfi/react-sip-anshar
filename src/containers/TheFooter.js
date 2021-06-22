import React from 'react'
import { CFooter, CLink } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
      <CLink to="/dashboard" rel="noopener noreferrer">CV. Twincom Group</CLink>
        <span className="ml-1">&copy; 2020</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Aplikasi Sistem Penjualan</span>
        <CLink to="/dashboard" rel="noopener noreferrer">CV. Twincom Group</CLink>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
