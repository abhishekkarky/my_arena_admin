import { Buildings, Calendar, MoneyRecive, People, SearchStatus } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { getBookingCountAndGrowthForAdminApi, getFutsalCountAndGrowthForAdminApi, getNotificationCountAndGrowthForAdminApi, getRevenueTotalsForAdminApi, getUserCountAndGrowthApi, getVendorCountAndGrowthApi } from '../../../../apis/api';

const DashboardCounts = () => {
    const [totalUser, setTotalUser] = useState(0);
    const [totalUserGrowth, setTotalUserGrowth] = useState(0);
    const [totalVendor, setTotalVendor] = useState(0);
    const [totalVendorGrowth, setTotalVendorGrowth] = useState(0);
    const [totalBooking, setTotalBooking] = useState(0);
    const [totalBookingGrowth, setTotalBookingGrowth] = useState(0);
    const [totalFutsal, setTotalFutsal] = useState(0);
    const [totalFutsalGrowth, setTotalFutsalGrowth] = useState(0);
    const [todayRevenue, setTodayRevenue] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalRevenueGrowth, setTotalRevenueGrowth] = useState(0);
    const [totalNotification, setTotalNotification] = useState(0);

    useEffect(() => {
        getUserCountAndGrowthApi().then((response) => {
            if (response.data.success === true) {
                setTotalUser(response.data.count);
                setTotalUserGrowth(response.data.growth);
            }
        })

        getVendorCountAndGrowthApi().then((response) => {
            if (response.data.success === true) {
                setTotalVendor(response.data.count);
                setTotalVendorGrowth(response.data.growth);
            }
        })

        getBookingCountAndGrowthForAdminApi().then((response) => {
            if (response.data.success === true) {
                setTotalBooking(response.data.count);
                setTotalBookingGrowth(response.data.growth);
            }
        })

        getFutsalCountAndGrowthForAdminApi().then((response) => {
            if (response.data.success === true) {
                setTotalFutsal(response.data.count);
                setTotalFutsalGrowth(response.data.growth);
            }
        })

        getRevenueTotalsForAdminApi().then((response) => {
            if (response.data.success === true) {
                setTodayRevenue(response.data.todayTotal);
                setTotalRevenue(response.data.overallTotal);
                setTotalRevenueGrowth(response.data.growth);
            }
        })

        getNotificationCountAndGrowthForAdminApi().then((response) => {
            if (response.data.success === true) {
                setTotalNotification(response.data.count);
            }
        })
    }, [])

    return (
        <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <People size={32} variant='Bold' />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Users</p>
                    <p className='font-semibold text-4xl'>{totalUser}</p>
                    {
                        totalUserGrowth === null ? (
                            <p className='text-red-600 mt-1'>0% since last month</p>
                        ) : totalUserGrowth > 0 ? (
                            <p className='text-green-600 mt-1'>{totalUserGrowth.toFixed(1)}% since last month</p>
                        ) : (
                            <p className='text-red-600 mt-1'>{totalUserGrowth.toFixed(1)}% since last month</p>
                        )
                    }
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <Calendar size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Bookings</p>
                    <p className='font-semibold text-4xl'>{totalBooking}</p>
                    {
                        totalBookingGrowth === null ? (
                            <p className='text-red-600 mt-1'>0% since last month</p>
                        ) : totalBookingGrowth > 0 ? (
                            <p className='text-green-600 mt-1'>{totalBookingGrowth.toFixed(1)}% since last month</p>
                        ) : (
                            <p className='text-red-600 mt-1'>{totalBookingGrowth.toFixed(1)}% since last month</p>
                        )
                    }
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <SearchStatus size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Futsals</p>
                    <p className='font-semibold text-4xl'>{totalFutsal}</p>
                    {
                        totalFutsalGrowth === null ? (
                            <p className='text-red-600 mt-1'>0% since last month</p>
                        ) : totalFutsalGrowth > 0 ? (
                            <p className='text-green-600 mt-1'>{totalFutsalGrowth.toFixed(1)}% since last month</p>
                        ) : (
                            <p className='text-red-600 mt-1'>{totalFutsalGrowth.toFixed(1)}% since last month</p>
                        )
                    }
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <MoneyRecive size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Revenue</p>
                    <p className='font-semibold text-4xl flex items-center gap-2'>{totalRevenue} <span className='text-2xl'>({todayRevenue})</span></p>
                    {
                        totalRevenueGrowth === null ? (
                            <p className='text-red-600 mt-1'>0% since last month</p>
                        ) : totalRevenueGrowth > 0 ? (
                            <p className='text-green-600 mt-1'>{totalRevenueGrowth.toFixed(1)}% since last month</p>
                        ) : (
                            <p className='text-red-600 mt-1'>{totalRevenueGrowth.toFixed(1)}% since last month</p>
                        )
                    }
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <Buildings size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Vendors</p>
                    <p className='font-semibold text-4xl'>{totalVendor}</p>
                    {
                        totalVendorGrowth === null ? (
                            <p className='text-red-600 mt-1'>0% since last month</p>
                        ) : totalVendorGrowth > 0 ? (
                            <p className='text-green-600 mt-1'>{totalVendorGrowth.toFixed(1)}% since last month</p>
                        ) : (
                            <p className='text-red-600 mt-1'>{totalVendorGrowth.toFixed(1)}% since last month</p>
                        )
                    }
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <Buildings size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Unread Notifications</p>
                    <p className='font-semibold text-4xl'>{totalNotification}</p>
                    <p className='text-green-600 mt-1'>No Calucation Yet</p>
                </div>
            </div>
        </main>
    )
}

export default DashboardCounts