import { Trash } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { getAllPaymentLogsApi } from '../../../../apis/api';

const VendorPaymentTable = ({ searchQuery, selectedDate, selectedStartDate }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [paymentLogs, setPaymentLogs] = useState([]);
    const [totalPaymentLogCount, setTotalPaymentLogCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const getPaymentLogsData = async () => {
        setIsLoading(true);
        getAllPaymentLogsApi(currentPage, itemsPerPage, searchQuery, selectedDate, selectedStartDate).then((response) => {
            if (response.data.success === true) {
                setPaymentLogs(response.data.paymentLogs);
                setTotalPaymentLogCount(response.data.totalCount);
                setIsLoading(false);
            }
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getPaymentLogsData();
    }, [isUpdated, currentPage, itemsPerPage, searchQuery, selectedDate, selectedStartDate]);

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
    }

    useEffect(() => {
        if (searchQuery === undefined || searchQuery === null || searchQuery === '') {
            getPaymentLogsData();
        }
    }, [])

    function handleDelete() {
        Swal.fire({
            title: 'Are you sure you want to delete this payment?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Payment has been deleted.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <>
            <div class="relative overflow-auto">
                <table class="w-full text-sm text-left text-neutral-700 bg-white">
                    <thead class="text-sm bg-neutral-100 text-neutral-700 uppercase sticky top-0">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Pidx
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Futsal
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ?
                                <tr>
                                    <td colSpan="5" className='border-l border-b py-5'>
                                        <div className='px-5 text-xl font-medium text-red-500'>Loading...</div>
                                    </td>
                                </tr> :
                                <>
                                    {paymentLogs && paymentLogs.length > 0 ? paymentLogs.map((paymentLog) => (
                                        <tr class="border-b hover:bg-white">
                                            <td className='px-6 py-4'>
                                                {paymentLog.pidx ? paymentLog.pidx : '-'}
                                            </td>
                                            <td class="px-6 py-4">
                                                {paymentLog?.by?.fullName}
                                                <hr className='my-0.5 border-white' />
                                                {paymentLog?.by?.number}
                                            </td>
                                            <td class="px-6 py-4">
                                                {paymentLog?.futsal?.name}
                                            </td>
                                            <td class="px-6 py-4">
                                                {paymentLog?.amount}
                                            </td>
                                            <td class="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={handleDelete} className='text-neutral-700 hover:text-red-500'>
                                                        <Trash size={22} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) :
                                        <tr className='w-full border-b dark:border-neutral-700'>
                                            <td colSpan="5" className='border-l border-b py-5'>
                                                <div className='px-5 text-xl font-medium text-red-500'>No Data Found</div>
                                            </td>
                                        </tr>
                                    }
                                </>
                        }
                    </tbody>
                </table>
                <ReactPaginate
                    className="flex items-center border rounded-lg text-neutral-700 my-2 p-auto w-max"
                    pageCount={Math.ceil(totalPaymentLogCount / itemsPerPage)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination flex'}
                    previousLabel={<span className="flex items-center justify-center text-neutral-700 px-2 py-1">Previous</span>}
                    nextLabel={<span className="flex items-center justify-center text-neutral-700 px-2 py-1">Next</span>}
                    pageClassName="flex items-center justify-center px-2 py-1 border-l hover:bg-neutral-100"
                    breakClassName="flex items-center justify-center px-2 py-1 border-l hover:bg-neutral-100"
                    activeClassName="bg-black/5 text-black"
                    disabledClassName="pagination__link--disabled pointer-events-none text-gray-400 cursor-not-allowed"
                    previousClassName="flex items-center justify-center px-2 py-1 hover:bg-neutral-200"
                    nextClassName="flex items-center justify-center px-2 py-1 border-l hover:bg-neutral-100"
                    pageLinkClassName="flex items-center justify-center px-2 py-1"
                    breakLinkClassName="flex items-center justify-center px-2 py-1"
                    activeLinkClassName="text-primary"
                />
            </div>
        </>
    )
}

export default VendorPaymentTable