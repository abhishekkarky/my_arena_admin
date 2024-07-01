import { Edit, Trash } from 'iconsax-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteFutsalByIdApi, getAllFutsalApi } from '../../../../apis/api';
import EditFutsalModal from './EditFutsalModal';

const VendorFutsalTable = ({ searchQuery, isUpdated, setIsUpdated }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFutsalEditModalOpen, setIsFutsalEditModalOpen] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 20;
    const [futsals, setFutsals] = useState([]);
    const [selectedFutsalId, setSelectedFutsalId] = useState(null);

    const getFutsals = async () => {
        setIsLoading(true);
        const response = await getAllFutsalApi(currentPage, itemPerPage, searchQuery);
        if (response.data.success) {
            setFutsals(response.data.futsals);
            setTotalCount(response.data.totalCount);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getFutsals();
    }, [searchQuery, currentPage, itemPerPage, isUpdated]);

    const handleFutsalEditModal = (id) => {
        setSelectedFutsalId(id);
        setIsFutsalEditModalOpen(!isFutsalEditModalOpen);
    }

    function handleDelete(id, name) {
        Swal.fire({
            title: `Are you sure you want to delete ${name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteFutsalByIdApi(id);
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Futsal has been deleted.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setIsUpdated(true);
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to delete futsal.',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while deleting futsal.',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        })
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
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
                                Available Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price per hour
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
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
                                    {futsals && futsals.length > 0 ? futsals.map((futsal, index) => (
                                        <tr class="border-b hover:bg-white">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                                                <img src={futsal.futsalImageUrl} className='h-[70px] w-[120px] rounded-lg text-white text-center outline-none border-none' />
                                            </th>
                                            <td class="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <Link className='hover:text-green-600'>{futsal.name}</Link>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                {futsal.location}
                                            </td>
                                            <td className="px-6 py-4 overflow-auto max-w-[200px]">
                                                {futsal.timeSlots && futsal.timeSlots.length > 0 ? (
                                                    futsal.timeSlots.map((slot, index) => (
                                                        <span key={index}>
                                                            {slot.startTime}-{slot.endTime}
                                                            {index < futsal.timeSlots.length - 1 ? ', ' : ''}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <p>No Time Slots Available</p>
                                                )}
                                            </td>

                                            <td class="px-6 py-4">
                                                Rs. {futsal.price}
                                            </td>
                                            <td class="px-6 py-4">
                                                {moment(futsal.createdAt).format('YYYY-MM-DD, hh:mm A')}
                                            </td>
                                            <td class="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => handleFutsalEditModal(futsal._id)} className='text-neutral-700 hover:text-red-500'>
                                                        <Edit size={21} />
                                                    </button>
                                                    <button onClick={() => handleDelete(futsal._id, futsal.name)} className='text-neutral-700 hover:text-red-500'>
                                                        <Trash size={22} />
                                                    </button>
                                                </div>
                                                {/* {subscriber.inGroup.length} */}
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
                {/* {
                    subscriber && subscriber.length > 0 ? */}
                <ReactPaginate
                    className="flex items-center border rounded-lg text-neutral-700 my-2 p-auto w-max"
                    pageCount={Math.ceil(totalCount / itemPerPage)}
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
                {/* :
                        null
                } */}
                <EditFutsalModal open={isFutsalEditModalOpen} onClose={() => setIsFutsalEditModalOpen(false)} futsalId={selectedFutsalId} setIsUpdated={setIsUpdated} />
            </div>
        </>
    )
}

export default VendorFutsalTable