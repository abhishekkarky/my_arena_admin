import { Trash } from 'iconsax-react';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

const VendorPaymentTable = () => {
    const [isLoading, setIsLoading] = useState(false);

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
                                    {/* {subscriber && subscriber.length > 0 ? subscriber.map((subscriber, index) => ( */}
                                    <tr class="border-b hover:bg-white">
                                        <td className='px-6 py-4'>
                                            pidx
                                        </td>
                                        <td class="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                Abhishek karki
                                                {/* <Link to={`/subscriber-detail/${subscriber._id}`} className='flex text-base hover:text-primary'>{subscriber.fullName}</Link>
                                                    <p>{subscriber.email}</p> */}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            Gokarna Futsal
                                            {/* {moment(subscriber.createdAt).format('MMM Do, YYYY, h:mm A')} */}
                                        </td>
                                        <td class="px-6 py-4">
                                            Rs. 1000
                                            {/* {subscriber.broadcasts.length} */}
                                        </td>
                                        <td class="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button onClick={handleDelete} className='text-neutral-700 hover:text-red-500'>
                                                    <Trash size={22} />
                                                </button>
                                            </div>
                                            {/* {subscriber.inGroup.length} */}
                                        </td>
                                    </tr>
                                    {/* )) :
                                        <tr className='w-full border-b dark:border-neutral-700'>
                                            <td colSpan="5" className='border-l border-b py-5'>
                                                <div className='px-5 text-xl font-medium text-red-500'>No Data Found</div>
                                            </td>
                                        </tr>
                                    } */}
                                </>
                        }
                    </tbody>
                </table>
                {/* {
                    subscriber && subscriber.length > 0 ? */}
                <ReactPaginate
                    className="flex items-center border rounded-lg text-neutral-700 my-2 p-auto w-max"
                    pageCount={2}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    // onPageChange={handlePageClick}
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
            </div>
        </>
    )
}

export default VendorPaymentTable