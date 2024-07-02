import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { getCountryCountForVendorApi } from '../../../../apis/api';
import Loader from '../../../../components/Loader';

const VendorGeoChart = () => {
    const [counts, setCounts] = useState([0]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCountryCountForVendorApi().then((res) => {
            if (res.data.success) {
                setCounts(res.data.data)
                setIsLoading(false)
            }
        })
    }, [])

    const chartData = [["Country", "Total Vendors "], ...counts.map(({ country, count }) => [country, count])];

    const options = {
        colorAxis: { colors: ["#F18E2A"] },
        legend: 'none'
    };
    return (
        <>
            <div className='w-full h-auto max-h-[60vh] bg-white rounded-lg shadow-md border'>
                {
                    isLoading ?
                        <div className="w-full h-full flex justify-center items-center">
                            <Loader />
                        </div> :
                        <div className="flex flex-col p-4 gap-6 rounded-lg bg-white w-full h-full shadow-md overflow-hidden">
                            <p className='text-neutral-700 text-xl'>Overall <span className='text-green-600'>vendors</span> in each country</p>
                            <Chart
                                className='h-full w-full'
                                chartEvents={[
                                    {
                                        eventName: "select",
                                        callback: ({ chartWrapper }) => {
                                            const chart = chartWrapper.getChart();
                                            const selection = chart.getSelection();
                                            if (selection.length === 0) return;
                                            const region = chartData[selection[0].row + 1];
                                            console.log("Selected : " + region);
                                        },
                                    },
                                ]}
                                chartType="GeoChart"
                                width="100%"
                                height="350px"
                                data={chartData}
                                options={options}
                            />
                        </div>
                }
            </div>

        </>
    )
}

export default VendorGeoChart