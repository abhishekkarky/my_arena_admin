import { SearchNormal1 } from 'iconsax-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import PaymentTable from './components/PaymentTable';

const PaymentLogs = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));
    const [searchQuery, setSearchQuery] = useState(undefined);

    useEffect(() => {
        const defaultDate = moment().subtract(31, 'days').format('YYYY-MM-DD');
        setSelectedDate(defaultDate);
    }, []);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setSelectedStartDate(event.target.value);
    };

    const getSelectedMonthRange = () => {
        const startMonth = moment(selectedDate).format('MMMM');
        const endMonth = moment(selectedStartDate).format('MMMM');
        return `${startMonth} to ${endMonth}`;
    };
    return (
        <main className='flex flex-col gap-8 md:px-10 md:pb-10 pb-0 px-4 pt-6 max-w-[1440px] mx-auto'>
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-between items-center gap-5 flex-wrap py-4">
                    <p className='text-2xl'>Showing Payment Reports from {getSelectedMonthRange()}</p>
                    <div className="md:w-auto w-full md:flex md:flex-row flex flex-col justify-end items-center gap-2 md:mb-0 mb-5">
                        <form className="w-full h-full bg-neutral-50 px-2 py-2 border rounded-lg border-neutral-300 outline-none flex items-center">
                            <input type="text" placeholder='Search...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='bg-transparent outline-none flex-1' />
                            <button type='submit'>
                                <SearchNormal1 size={18} />
                            </button>
                        </form>
                        <div className="md:w-auto w-full flex items-center border bg-neutral-50 border-neutral-300 rounded-md text-neutral-700">
                            <input type="date" className='w-[120px] h-full bg-transparent px-1 py-2 outline-none' value={selectedDate} onChange={handleDateChange} />
                            <span>—</span>
                            <input type="date" className='w-[120px] h-full bg-transparent px-1 py-2 outline-none' value={selectedStartDate} onChange={handleStartDateChange} />
                        </div>
                    </div>
                </div>
                <PaymentTable />
            </div>
        </main>
    )
}

export default PaymentLogs