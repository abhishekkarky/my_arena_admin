import { Edit, Trash } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteBookingbyId, getAllBookingsApi } from '../../../../apis/api';
import EditBookingModal from './EditBookingModal';
import moment from 'moment';

const VendorBookingTable = ({ searchQuery, selectedDate, selectedStartDate, isUpdated, setIsUpdated }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [totalBookingCount, setTotalBookingCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const fetchBookings = async () => {
        setIsLoading(true);
        getAllBookingsApi(currentPage, itemsPerPage, searchQuery, selectedDate, selectedStartDate).then((response) => {
            if (response.data.success === true) {
                setBookings(response.data.bookingsData);
                setTotalBookingCount(response.data.totalCount);
                setIsLoading(false);
            }
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchBookings();
    }, [isUpdated, currentPage, itemsPerPage, searchQuery, selectedDate, selectedStartDate]);

    function handleDelete(id, name) {
        Swal.fire({
            title: `Are you sure you want to delete this booking of ${name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteBookingbyId(id);
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

    const handleEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
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
                                User
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Futsal Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Futsal Location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Booking Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Booking Time
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price per hour
                            </th>
                            <th scope="col" class="px-6 py-3">
                                isPaid
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
                                    <td colSpan="8" className='border-l border-b py-5'>
                                        <div className='px-5 text-xl font-medium text-red-500'>Loading...</div>
                                    </td>
                                </tr> :
                                <>
                                    {
                                        bookings && bookings.length > 0 ?
                                            bookings.map((booking, index) => (
                                                <tr class="border-b hover:bg-white">
                                                    <td class="px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            <Link className='hover:text-green-600 flex flex-col gap-1'>
                                                                <p className='text-[15px]'>{booking.user.fullName}</p>
                                                                <p className='text-sm'>{booking.user.number}</p>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            <Link className='hover:text-green-600'>{booking.futsal.name}</Link>
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {booking.futsal.location}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {moment(booking?.date).format('MMMM Do, YYYY (dddd)')}
                                                    </td>
                                                    <td class="px-6 py-4 overflow-auto">
                                                        {booking.timeSlot}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {booking.futsal.price}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {
                                                            booking.paid ? 'Yes' : 'No'
                                                        }
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <button onClick={handleEditModal} className='text-neutral-700 hover:text-red-500'>
                                                                <Edit size={20} />
                                                            </button>
                                                            <button onClick={() => handleDelete(booking._id, booking.user.fullName)} className='text-neutral-700 hover:text-red-500'>
                                                                <Trash size={22} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr className='w-full border-b dark:border-neutral-700'>
                                                <td colSpan="8" className='border-l border-b py-5'>
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
                    pageCount={Math.ceil(totalBookingCount / itemsPerPage)}
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
            <EditBookingModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
        </>
    )
}

export default VendorBookingTable