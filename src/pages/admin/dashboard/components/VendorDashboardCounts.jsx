import { Buildings, Calendar, MoneyRecive, People, SearchStatus } from 'iconsax-react'
import React from 'react'

const VendorDashboardCounts = () => {
    return (
        <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <Calendar size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Bookings</p>
                    <p className='font-semibold text-4xl'>100</p>
                    <p className='text-red-600 mt-1'>0% since last month</p>
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <SearchStatus size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Futsals</p>
                    <p className='font-semibold text-4xl'>100</p>
                    <p className='text-red-600 mt-1'>0% since last month</p>
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <MoneyRecive size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Revenue</p>
                    <p className='font-semibold text-4xl'>100</p>
                    <p className='text-red-600 mt-1'>0% since last month</p>
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <Buildings size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Unread Notifications</p>
                    <p className='font-semibold text-4xl'>100</p>
                    <p className='text-green-600 mt-1'>No Calucation Yet</p>
                </div>
            </div>
        </main>
    )
}

export default VendorDashboardCounts