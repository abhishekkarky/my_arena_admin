import { MoneyChange } from 'iconsax-react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const PaymentSettings = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isAddPaymentMethodSectionOpen, setIsAddPaymentMethodSectionOpen] = useState(false)
    const localUser = JSON.parse(localStorage.getItem('user'));
    const [updated, setIsUpdated] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('khalti');
    const [paymentMethodError, setPaymentMethodError] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [secretKeyError, setSecretKeyError] = useState('');
    const [responseLoading, setResponseLoading] = useState(true);

    // useEffect(() => {
    //     getUserByIdApi(localUser._id).then((res) => {
    //         setDefaultCustomDomain(res.data.userDetail.defaultCustomDomain);
    //         setCustomDomains(res.data.userDetail.customDomains);
    //         setResponseLoading(false)
    //     })
    // }, [updated])

    const handleAddPaymentSectionOpen = () => {
        setIsAddPaymentMethodSectionOpen(!isAddPaymentMethodSectionOpen)
    }

    const handleClear = () => {
        setPaymentMethod('')
        setSecretKey('')
    }

    const validate = () => {
        let isValid = true

        setPaymentMethodError('')
        setSecretKeyError('')

        if (paymentMethod.trim() === '') {
            setPaymentMethodError('Payment Method is required')
            isValid = false
        }
        if (secretKey.trim() === '') {
            setSecretKeyError('Live Secret Key is required');
            isValid = false;
        }
        return isValid
    }

    function handleRemove() {
        Swal.fire({
            title: 'Are you sure you want to remove this payment method?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Removed!',
                    text: 'Payment method has been removed.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    // const handleAddCustomDomain = (e) => {
    //     e.preventDefault();
    //     const isValid = validate()
    //     if (!isValid) {
    //         return
    //     }
    //     setIsLoading(true)
    //     const userInput = appPassword;
    //     const trimmedInput = userInput.replace(/\s+/g, '');
    //     const data = {
    //         customEmail: customEmail,
    //         appPassword: trimmedInput
    //     }
    //     addCustomDomainApi(data).then((res) => {
    //         if (res.data.success) {
    //             addToast(res.data.message, {
    //                 appearance: 'success',
    //                 autoDismiss: true
    //             })
    //             setIsUpdated(true)
    //             setIsLoading(false)
    //             handleConnectDomainSectionOpen()
    //             setCustomEmail('')
    //             setAppPassword('')
    //         } else {
    //             addToast(res.data.message, {
    //                 appearance: 'error',
    //                 autoDismiss: true
    //             })
    //             setIsLoading(false)
    //         }
    //     }).catch(err => {
    //         if (err.response && err.response.status === 403) {
    //             addToast(err.response.data.message, {
    //                 appearance: 'info',
    //                 autoDismiss: true
    //             })
    //             setIsLoading(false)
    //         } else {
    //             addToast('Something went wrong', {
    //                 appearance: 'error',
    //                 autoDismiss: true
    //             })
    //             setIsLoading(false)
    //         }
    //     })
    // }

    // const handleSetDefault = (id) => {
    //     const data = {
    //         domainId: id
    //     };
    //     setDefaultDomainApi(data).then((res) => {
    //         if (res.data.success) {
    //             addToast(res.data.message, {
    //                 appearance: 'success',
    //                 autoDismiss: true
    //             })
    //             setIsUpdated(true)
    //             setIsLoading(false)
    //             window.location.reload();
    //         } else {
    //             addToast(res.data.message, {
    //                 appearance: 'error',
    //                 autoDismiss: true
    //             })
    //             setIsLoading(false)
    //         }
    //     }).catch(err => {
    //         if (err.response && err.response.status === 403) {
    //             addToast(err.response.data.message, {
    //                 appearance: 'info',
    //                 autoDismiss: true
    //             })
    //             setIsLoading(false)
    //         } else {
    //             addToast('Something went wrong', {
    //                 appearance: 'error',
    //                 autoDismiss: true
    //             })
    //             setIsLoading(false)
    //         }
    //     })
    // }

    // const handleRemoveDomain = (id) => {
    //     const data = {
    //         domainId: id
    //     };
    //     deleteDomainApi(data).then((res) => {
    //         if (res.data.success) {
    //             addToast(res.data.message, {
    //                 appearance: 'success',
    //                 autoDismiss: true
    //             })
    //             setIsUpdated(true)
    //             setIsLoading(false)
    //         } else {
    //             addToast(res.data.message, {
    //                 appearance: 'error',
    //                 autoDismiss: true
    //             })
    //             setIsLoading(false)
    //         }
    //     }).catch(err => {
    //         if (err.response && err.response.status === 403) {
    //             addToast(err.response.data.message, {
    //                 appearance: 'info',
    //                 autoDismiss: true
    //             })
    //             setIsLoading(false)
    //         } else {
    //             addToast('Something went wrong', {
    //                 appearance: 'error',
    //                 autoDismiss: true
    //             })
    //             setIsLoading(false)
    //         }
    //     })
    // }
    return (
        <main className={`bg-white p-4 -m-4 rounded-[8px] text-neutral-700 min-h-[480px] border ${isLoading ? 'pointer-events-none' : ''}`}>
            <h1 className='text-2xl py-4'>Payment Settings </h1>
            <p>Manage all your payment settings. You can remove them anytime either by editing and deleting your payment methods.</p>
            <hr className='border my-3' />
            <div class="relative overflow-auto mt-5">
                <table class="w-full text-sm text-left text-neutral-700">
                    <thead class="text-sm uppercase sticky top-0 bg-neutral-200">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Payment Method
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Payment Method
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            className="border-b hover:bg-white text-base"
                        >
                            <td className="px-6 py-4">Khalti</td>
                            <td className="px-6 py-4">Secret key</td>
                            <td className="px-6 py-4">
                                <button onClick={handleRemove} className="border border-neutral-300 rounded-md p-2">
                                    {isLoading ? 'Removing...' : 'Remove'}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr className='border my-10' />
            <h1 className='text-2xl'>Setup your new payment method </h1>
            <div className="w-full p-10 bg-neutral-100 mt-5 rounded-lg md:flex md:flex-row flex-col md:text-left text-justify items-start justify-start gap-4">
                <div className="w-[40px] h-[40px]">
                    <MoneyChange size={40} />
                </div>
                <div className="flex-1 flex flex-col gap-5">
                    <p>You can add multiple payment methods based on your needs. Customer will be able to select any one of them while booking futsal. Your payment can be received on your own bank account.</p>
                    <button onClick={handleAddPaymentSectionOpen} className='w-max px-3 py-2 bg-black text-white rounded-lg text-sm opacity-90'>{isAddPaymentMethodSectionOpen ? 'Close' : 'Add a new payment method'} </button>
                </div>
            </div>
            <div className={`transition-all ease-in-out duration-500 ${isAddPaymentMethodSectionOpen ? 'max-h-[500px]' : 'max-h-0 overflow-hidden'}`}>
                <div className="w-full py-3 md:flex md:flex-row flex flex-col gap-4 px-5">
                    <div className="md:w-[49%] w-full flex flex-col gap-2">
                        <p>Payment Method</p>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className='border border-neutral-300 rounded-md p-2 outline-none'>
                            <option value="Khalti">Khalti</option>
                        </select>
                        {
                            paymentMethodError &&
                            <p className='text-red-500 text-xs'>{paymentMethodError}</p>
                        }
                    </div>
                    <div className="md:w-[49%] w-full flex flex-col gap-2">
                        <p>Live Secret Key</p>
                        <input type="text" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder='###############' className='border border-neutral-300 rounded-md p-2 outline-none' />
                        {
                            secretKeyError &&
                            <p className='text-red-500 text-xs'>{secretKeyError}</p>
                        }
                    </div>
                </div>
                <div className="w-full px-5 mt-2 flex flex-wrap gap-2">
                    <button onClick={handleClear} className='border px-3 py-2 bg-red-600 rounded-lg text-white'>Clear</button>
                    <button onClick={handleAddPaymentSectionOpen} className='border px-3 py-2 bg-black rounded-lg text-white'>
                        {isLoading ? 'Saving...' : 'Save Payment Method'}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default PaymentSettings