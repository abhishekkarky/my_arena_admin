import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getFutsalCountForGraphApi } from '../../../../apis/api';
import Loader from '../../../../components/Loader';

const VendorTotalFutsalBarChart = () => {
    const [futsalData, setFutsalData] = useState([0]);
    const [loading, setLoading] = useState(false);
    const [year] = useState(moment().format('YYYY'))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const futsalResponse = await getFutsalCountForGraphApi();
                const fullYearData = Array(12).fill(0).map((_, index) => ({
                    date: moment().month(index).startOf('month').format('YYYY-MM-DD'),
                    count: futsalResponse.data.counts[index] || 0
                }));
                setFutsalData(fullYearData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error('Error fetching futsal data for graph');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip border bg-white rounded-lg overflow-hidden text-neutral-700">
                    <div className="bg-neutral-100 border-b p-2 text-sm"><p>Overall Futsal</p></div>
                    <p className='text-sm px-2'>In {moment(label).format('MMMM')}</p>
                    <p className='text-[14px] px-2'>Count: {payload[0].value}</p>
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
                        data={futsalData}
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
