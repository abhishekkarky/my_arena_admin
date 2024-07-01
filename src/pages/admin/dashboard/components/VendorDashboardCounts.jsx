import { Buildings, Calendar, MoneyRecive, SearchStatus } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getBookingsCountAndGrowthApi, getFutsalCountAndGrowthApi, getNotificationCountAndGrowthApi, getRevenueTotalsApi } from '../../../../apis/api';

const VendorDashboardCounts = () => {
    const [totalFutsalCount, setTotalFutsalCount] = useState(0);
    const [totalFutsalGrowth, setTotalFutsalGrowth] = useState(0);
    const [totalBookingCount, setTotalBookingCount] = useState(0);
    const [totalBookingGrowth, setTotalBookingGrowth] = useState(0);
    const [totalNotificationCount, setTotalNotificationCount] = useState(0);
    const [totalNotificationGrowth, setTotalNotificationGrowth] = useState(0);
    const [todayTotalRevenue, setTodayTotalRevenue] = useState(0);
    const [overallRevenue, setOverallRevenue] = useState(0);
    const [totalRevenueGrowth, setTotalRevenueGrowth] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFutsalCountAndGrowthApi().then((response) => {
            if (response.data.success === true) {
                setTotalFutsalCount(response.data.count);
                setTotalFutsalGrowth(response.data.growth);
                setIsLoading(false);
            }
        }).catch((error) => {
            if (error.response && error.response.status === 403) {
                toast.error(error.response.data.message);
                setIsLoading(false);
            } else {
                toast.error('☹ Something went wrong ☹');
                setIsLoading(false);
            }
        })
        getBookingsCountAndGrowthApi().then((response) => {
            if (response.data.success === true) {
                setTotalBookingCount(response.data.count);
                setTotalBookingGrowth(response.data.growth);
                setIsLoading(false);
            }
        }).catch((error) => {
            if (error.response && error.response.status === 403) {
                toast.error(error.response.data.message);
                setIsLoading(false);
            } else {
                toast.error('☹ Something went wrong ☹');
                setIsLoading(false);
            }
        })
        getNotificationCountAndGrowthApi().then((response) => {
            if (response.data.success === true) {
                setTotalNotificationCount(response.data.count);
                setTotalNotificationGrowth(response.data.growth);
                setIsLoading(false);
            }
        }).catch((error) => {
            if (error.response && error.response.status === 403) {
                toast.error(error.response.data.message);
                setIsLoading(false);
            } else {
                toast.error('☹ Something went wrong ☹');
                setIsLoading(false);
            }
        })
        getRevenueTotalsApi().then((response) => {
            if (response.data.success === true) {
                setTodayTotalRevenue(response.data.todayTotal);
                setOverallRevenue(response.data.overallTotal);
                setTotalRevenueGrowth(response.data.growth);
                setIsLoading(false);
            }
        }).catch((error) => {
            if (error.response && error.response.status === 403) {
                toast.error(error.response.data.message);
                setIsLoading(false);
            } else {
                toast.error('☹ Something went wrong ☹');
                setIsLoading(false);
            }
        })
    }, [])
    return (
        <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <Calendar size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Bookings</p>
                    <p className='font-semibold text-4xl'>{isLoading ? 'Loading...' : totalBookingCount}</p>
                    {
                        totalBookingGrowth && totalBookingGrowth > 0 ?
                            <p className='text-green-600 mt-1'>+{totalBookingGrowth.toFixed(2) ?? 0}% since last month</p> :
                            totalBookingGrowth && totalBookingGrowth < 0 ?
                                <p className='text-red-600 mt-1'>{totalBookingGrowth.toFixed(2) ?? 0}% since last month</p> :
                                <p className='text-red-600 mt-1'>0% since last month</p>
                    }
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <SearchStatus size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Futsals</p>
                    <p className='font-semibold text-4xl'>{isLoading ? 'Loading...' : totalFutsalCount}</p>
                    {
                        totalFutsalGrowth && totalFutsalGrowth > 0 ?
                            <p className='text-green-600 mt-1'>+{totalFutsalGrowth.toFixed(2) ?? 0}% since last month</p> :
                            totalFutsalGrowth && totalFutsalGrowth < 0 ?
                                <p className='text-red-600 mt-1'>{totalFutsalGrowth.toFixed(2) ?? 0}% since last month</p> :
                                <p className='text-red-600 mt-1'>0% since last month</p>
                    }
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <MoneyRecive size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Total Revenue</p>
                    <p className='font-semibold text-4xl flex items-center gap-2'>{isLoading ? 'Loading...' : overallRevenue} <span className='text-2xl'>({todayTotalRevenue})</span></p>
                    {
                        totalRevenueGrowth && totalRevenueGrowth > 0 ?
                            <p className='text-green-600 mt-1'>+{totalRevenueGrowth.toFixed(2) ?? 0}% since last month</p> :
                            totalRevenueGrowth && totalRevenueGrowth < 0 ?
                                <p className='text-red-600 mt-1'>{totalRevenueGrowth.toFixed(2) ?? 0}% since last month</p> :
                                <p className='text-red-600 mt-1'>0% since last month</p>
                    }
                </div>
            </div>
            <div className="w-full border p-4 flex flex-wrap flex-row-reverse items-center justify-end bg-white rounded-lg shadow-md gap-2">
                <div className="bg-black text-white p-2 rounded-lg">
                    <Buildings size="32" variant="Bold" />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1 flex-grow min-w-[200px]">
                    <p className='uppercase font-medium'>Unread Notifications</p>
                    <p className='font-semibold text-4xl'>{isLoading ? 'Loading...' : totalNotificationCount}</p>
                    {
                        totalNotificationGrowth && totalNotificationGrowth > 0 ?
                            <p className='text-green-600 mt-1'>+{totalNotificationGrowth.toFixed(2) ?? 0}% since last month</p> :
                            totalNotificationGrowth && totalNotificationGrowth < 0 ?
                                <p className='text-red-600 mt-1'>{totalNotificationGrowth.toFixed(2) ?? 0}% since last month</p> :
                                <p className='text-red-600 mt-1'>0% since last month</p>
                    }
                </div>
            </div>
        </main>
    )
}

export default VendorDashboardCounts