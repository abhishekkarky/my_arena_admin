import { Forbidden, Trash } from 'iconsax-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { getAllVendorsApi } from '../../../../apis/api';
import getRandomColorFromList from '../../../../components/RandomColor';

const VendorTable = ({ searchQuery, startDate, endDate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [totalvendorCount, setTotalVendorCount] = useState(0);

    useEffect(() => {
        getAllVendorsApi(currentPage, itemsPerPage, searchQuery, startDate, endDate).then((res) => {
            if (res.data.success === true) {
                setVendors(res.data.vendors);
                setTotalVendorCount(res.data.totalCount);
                setIsLoading(false);
            }
        })
    }, [currentPage, searchQuery, startDate, endDate])

    function handleDelete() {
        Swal.fire({
            title: 'Are you sure you want to delete this vendor?',
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
                    text: 'Vendor has been deleted.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    function handleBlockStatus() {
        Swal.fire({
            title: 'Are you sure you want to change block status for this vendor?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Status Changed!',
                    text: 'Vendor block status has been changed.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const handlePageClick = (data) => {
        const currentPage = data.selected + 1;
        setCurrentPage(currentPage);
    }
    return (
        <>
            <div class="relative overflow-auto">
                <table class="w-full text-sm text-left text-neutral-700 bg-white">
                    <thead class="text-sm bg-neutral-100 text-neutral-700 uppercase sticky top-0">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Avatar
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Vendor
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Joined
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Block Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Futsals
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
                                    <td colSpan="6" className='border-l border-b py-5'>
                                        <div className='px-5 text-xl font-medium text-red-500'>Loading...</div>
                                    </td>
                                </tr> :
                                <>
                                    {
                                        vendors && vendors.length > 0 ? vendors.map((vendor, index) => (
                                            <tr class="border-b hover:bg-white">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                                    <input className='h-[35px] w-[35px] rounded-full text-white text-center outline-none border-none' style={{ backgroundColor: getRandomColorFromList() }} type="text" value={vendor && vendor.fullName.charAt(0)} readOnly />
                                                </th>
                                                <td class="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <p>{vendor.fullName}</p>
                                                        <p>{vendor.number}</p>
                                                        <p>{vendor.email}</p>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4">
                                                    {moment(vendor.createdAt).format('MMM Do, YYYY, h:mm A')}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {vendor.isBlocked ? 'Blocked' : 'Unblocked'}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {vendor.totalFutsals}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={handleBlockStatus} className='text-neutral-700 hover:text-red-500'>
                                                            <Forbidden size={20} />
                                                        </button>
                                                        <button onClick={handleDelete} className='text-neutral-700 hover:text-red-500'>
                                                            <Trash size={22} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                            <tr className='w-full border-b dark:border-neutral-700'>
                                                <td colSpan="6" className='border-l border-b py-5'>
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
                    pageCount={Math.ceil(totalvendorCount / itemsPerPage)}
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

export default VendorTable