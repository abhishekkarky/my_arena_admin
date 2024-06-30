import moment from 'moment'
import React, { useState } from 'react'
import DashboardCounts from './components/DashboardCounts'
import UserGeoChart from './components/UserGeoGraph'
import VendorGeoChart from './components/VendorGeoGraph'
import UserLineChart from './components/UserLineChart'
import VendorLineChart from './components/VendorLineChart'
import TotalBookingsBarChart from './components/TotalBookingsBarChart'

const SuperAdminDashboard = () => {
  const [selectedYear, setSelectedYear] = useState(moment().year())
  return (
    <>
      <main className='flex flex-col gap-8 md:px-10 md:pb-10 pb-0 px-4 pt-5 max-w-[1440px] mx-auto'>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex justify-between items-center gap-3 flex-wrap">
            <p className='text-2xl font-medium'>Overview</p>
            <select className='h-[45px] w-[100px] p-2 outline-none border rounded-lg bg-neutral-200/50' defaultValue={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
              <option value={selectedYear}>{selectedYear}</option>
              <option value={selectedYear - 1}>{selectedYear - 1}</option>
              <option value={selectedYear - 2}>{selectedYear - 2}</option>
              <option value={selectedYear - 3}>{selectedYear - 3}</option>
            </select>
          </div>
          <DashboardCounts />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-h-[60vh]">
          <UserGeoChart />
          <VendorGeoChart />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-h-[60vh]">
          <UserLineChart />
          <VendorLineChart />
        </div>
        <div className="grid grid-cols-1 min-h-[60vh]">
          <TotalBookingsBarChart />
        </div>
      </main>
    </>
  )
}

export default SuperAdminDashboard