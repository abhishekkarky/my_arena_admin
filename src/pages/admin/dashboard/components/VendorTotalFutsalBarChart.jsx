import moment from 'moment';
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Loader from '../../../../components/Loader';

const VendorTotalFutsalBarChart = () => {
    const [bookingsData, setBookingsData] = useState([0]);
    const [loading, setLoading] = useState(false);
    const [year] = useState(moment().format('YYYY'))

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const revenueResponse = await getbookingsDataForGraphApi();
    //             const fullYearData = Array(12).fill(0).map((_, index) => ({
    //                 date: moment().month(index).startOf('month').format('YYYY-MM-DD'),
    //                 count: revenueResponse.data.bookingsData[index] || 0
    //             }));
    //             setbookingsData(fullYearData);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             addToast('Error fetching user data', {
    //                 appearance: 'info',
    //                 autoDismiss: true
    //             });
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip border bg-white dark:bg-neutral-900 rounded-lg overflow-hidden dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
                    <div className="bg-background dark:bg-background-dark border-b p-2 text-sm dark:border-neutral-700"><p>Overall Futsal</p></div>
                    <p className='text-sm px-2'>In {moment(label).format('MMMM')}</p>
                    <p className='text-[14px] px-2'>Rs. {payload[0].value}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className='bg-white rounded-lg shadow-md p-4 flex flex-col gap-6 min-h-[60vh] border'>
            <p className='text-neutral-700 text-xl'>Total <span className='text-green-600'>Futsal</span> in {year}</p>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Loader />
                </div>
            ) : (
                <ResponsiveContainer>
                    <BarChart
                        data={bookingsData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
                    >
                        <XAxis dataKey="date" tickFormatter={(tick) => moment(tick).format("MMM")} fontSize={12} axisLine={{ stroke: 'black' }} />
                        <YAxis fontSize={13} axisLine={false} />
                        <CartesianGrid stroke="#F0F0F0" vertical={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" fill="#8884d8" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default VendorTotalFutsalBarChart;
