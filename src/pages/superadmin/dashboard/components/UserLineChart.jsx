import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getUserDataForGraphApi } from '../../../../apis/api';
import Loader from '../../../../components/Loader';

const UserLineChart = () => {
    const [userData, setUserData] = useState([0]);
    const [loading, setLoading] = useState(false);
    const [year] = useState(moment().format('YYYY'))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await getUserDataForGraphApi();
                setUserData(userResponse.data.counts);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error('Error fetching user data for graph');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const formattedLabel = moment(label, 'MMM').format('MMMM');
            return (
                <div className="custom-tooltip border bg-white rounded-lg overflow-hidden text-neutral-700">
                    <div className="bg-neutral-100 border-b p-2 text-sm"><p>All Users</p></div>
                    <p className='text-sm px-2'>In {formattedLabel}</p>
                    {payload.map((data, index) => (
                        <p key={index} className='text-[14px] px-2'>{data.name}: {data.value}</p>
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <div className='w-full h-auto min-h-[450px] bg-white rounded-lg shadow-md border'>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Loader />
                </div>
            ) : (
                <>
                    <div className="flex flex-col p-4 gap-6 rounded-lg bg-white w-full h-full shadow-md overflow-hidden">
                        <p className='text-neutral-700 text-xl'>Overall <span className='text-green-600'>User</span> in {year}</p>
                        <ResponsiveContainer>
                            <AreaChart
                                data={userData.map((count, index) => ({
                                    month: moment().month(index).format('MMM'),
                                    user: count,
                                }))}
                                margin={{ top: 20, right: 10, left: -25, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4E79A7" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4E79A7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#F0F0F0" vertical={false} />
                                <XAxis dataKey="month" fontSize={12} axisLine={{ stroke: 'black' }} />
                                <YAxis axisLine={false} fontSize={13} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="user" stroke="#4E79A7" strokeWidth={2} fillOpacity={1} fill="url(#colorUser)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserLineChart;
