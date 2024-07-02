import { Trash } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAllFutsalForSuperAdmin } from '../../../../apis/api';

const FutsalTable = ({ searchQuery, startDate, endDate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [futsals, setFutsals] = useState([]);
    const [totalFutsalCount, setTotalFutsalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const fetchFutsal = async () => {
        setIsLoading(true);
        const response = await getAllFutsalForSuperAdmin(currentPage, itemsPerPage, searchQuery, startDate, endDate);
        if (response.data.success) {
            setFutsals(response.data.futsals);
            setTotalFutsalCount(response.data.totalCount);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchFutsal();
    }, [currentPage, itemsPerPage, searchQuery, startDate, endDate])

    function handleDelete() {
        Swal.fire({
            title: 'Are you sure you want to delete this futsal?',
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
                    text: 'Futsal has been deleted.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
    }

    return (
        <>
            <div class="relative overflow-auto">
                <table class="w-full text-sm text-left text-neutral-700 bg-white">
                    <thead class="text-sm bg-neutral-100 text-neutral-700 uppercase sticky top-0">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Futsal Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Futsal Location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Vendor
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Available Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price per hour
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
                                    <td colSpan="7" className='border-l border-b py-5'>
                                        <div className='px-5 text-xl font-medium text-red-500'>Loading...</div>
                                    </td>
                                </tr> :
                                <>
                                    {
                                        futsals && futsals.length > 0 ? futsals.map((futsal, index) => (
                                            <tr class="border-b hover:bg-white">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                                    <img src={futsal?.futsalImageUrl} className='h-[70px] w-[120px] rounded-lg text-white text-center outline-none border-none' />
                                                </th>
                                                <td class="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <Link className='hover:text-green-600'>{futsal?.name}</Link>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4">
                                                    {futsal?.location}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <Link className='hover:text-green-600'>{futsal?.addedBy?.fullName}</Link>
                                                </td>
                                                <td class="px-6 py-4 overflow-auto">
                                                    { }
                                                </td>
                                                <td class="px-6 py-4">
                                                    {futsal?.price}
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
                                                <td colSpan="7" className='border-l border-b py-5'>
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
                    pageCount={Math.ceil(totalFutsalCount / itemsPerPage)}
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

export default FutsalTable