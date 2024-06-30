import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [number, setNumber] = useState('')
    const [numberError, setNumberError] = useState('')
    const [otp, setOtp] = useState()
    const [otpError, setOtpError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = () => {
        let isValid = true

        setNumberError('')

        if (number.trim() === '') {
            setNumberError('Number is required')
            isValid = false
        } else if (!number.length === 10) {
            setNumberError('Please provide valid number');
            isValid = false;
        }
        return isValid
    }

    const validateOTPAndPassword = () => {
        let isValid = true;

        setOtpError('');
        setPasswordError('');

        if (otp.trim() === '') {
            setOtpError('OTP is required');
            isValid = false;
        } else if (otp.length !== 4) {
            setOtpError('OTP must be of 4 digits');
            isValid = false;
        }
        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 8 || password.length > 15) {
            setPasswordError('Password must be between 8 and 15 characters');
            isValid = false;
        }
        return isValid;
    }

    const handleRequestOTP = (e) => {
        e.preventDefault();
        const isValid = validateEmail()
        if (!isValid) {
            return
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("number", number);
        // sendOTPApi(formData).then((res) => {
        //     if (res.data.success) {
        //         setSuccessMsg(res.data.message);
        //         setIsLoading(false);
        //         setSuccess(true)
        //         setErrorMsg('')
        //     }
        // }).catch((err) => {
        //     if (err.response && err.response.status === 403) {
        //         setErrorMsg(err.response.data.message)
        //         setIsLoading(false)
        //     } else {
        //         console.log(err.message);
        //         setIsLoading(false)
        //     }
        // })
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        const isValid = validateOTPAndPassword()
        if (!isValid) {
            return
        }
        setIsLoading(true)
        const formData = new FormData();
        formData.append("number", number)
        formData.append("otp", otp)
        formData.append("newPassword", password)

        // resetPasswordApi(formData).then((res) => {
        //     if (res.data.success) {
        //         addToast(res.data.message, {
        //             appearance: 'success',
        //             autoDismiss: true
        //         })
        //         navigate('/login')
        //         setIsLoading(false)
        //     }
        // }).catch((err) => {
        //     if (err.response && err.response.status === 403) {
        //         setErrorMsg(err.response.data.message)
        //         setSuccessMsg('')
        //         setIsLoading(false)
        //     } else {
        //         setErrorMsg("☹ Server is not responding ☹")
        //         setSuccessMsg('')
        //         setIsLoading(false)
        //         console.log(err.message);
        //     }
        // })
    };

    return (
        <main className={`w-full min-h-screen flex justify-center items-center font-roboto-slab bg-white ${isLoading ? 'pointer-events-none' : ''}`}>
            <div className="md:w-[55%] md:block hidden min-h-screen">
                <img className='max-h-screen w-full object-cover' src="/assets/images/auth-img.jpg" alt="" />
            </div>
            <div className="md:w-[45%] w-full h-auto flex flex-col justify-center items-center my-auto">
                <img className='w-[80px] h-[80px] mx-auto' src="/assets/images/my_arena_logo.png" alt="My Arena Logo" />
                <form className="md:w-[90%] max-w-[470px] w-full h-auto flex flex-col gap-y-3 mx-auto my-auto md:p-10 p-5">
                    {
                        success ?
                            <p className='text-3xl mx-auto'>Change <span className='text-primary mr-2'>Password</span></p> :
                            <p className='text-3xl mx-auto'>Request <span className='text-primary'>OTP</span></p>
                    }
                    {
                        success ?
                            <p className='text-base mx-auto mb-2 text-center'>Please don't share your OTP</p> :
                            <p className='text-base mx-auto mb-2 text-center'>Enter your Number</p>
                    }
                    {successMsg ?
                        <div className="flex flex-col w-full rounded-md overflow-hidden mb-1 mx-auto">
                            <div className="w-full border-2 border-green-500"></div>
                            <div className="w-full border bg-green-100 px-2 py-2">
                                <span className='text-[12px] text-green-500 mx-auto'>
                                    <p className='font-medium text-base px-2'>
                                        {successMsg}
                                    </p>
                                </span>
                            </div>
                        </div> :
                        null
                    }
                    {errorMsg ?
                        <div className="flex flex-col w-full rounded-md overflow-hidden mb-1 mx-auto">
                            <div className="w-full border-2 border-red-500"></div>
                            <div className="w-full border bg-red-100 px-2 py-2">
                                <span className='text-[12px] text-red-500 mx-auto'>
                                    <p className='font-medium text-base px-2'>
                                        {errorMsg}
                                    </p>
                                </span>
                            </div>
                        </div> :
                        null
                    }
                    <label className='text-md'>Number</label>
                    <div class="flex w-full">
                        <span class="inline-flex items-center px-3 min-w-[45px] text-sm text-neutral-500 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md bg-white">
                            <svg class={`w-[18px] h-[18px]`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                            </svg>
                        </span>
                        <input type="tel" class="rounded-none outline-none rounded-e-lg bg-transparent border text-neutral-600 block flex-1 min-w-0 w-full text-base border-gray-300 p-3" placeholder="9800000000" value={number} onChange={(e) => setNumber(e.target.value)} />
                    </div>
                    {
                        numberError &&
                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                            {numberError}
                        </p>
                    }
                    {
                        success &&
                        <>
                            <label className='text-md'>OTP</label>
                            <div class="flex w-full">
                                <span class="inline-flex items-center px-3 text-sm text-neutral-500 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md bg-white">
                                    <svg class={`w-[20px] h-[20px]`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <input type="number" class="rounded-none outline-none rounded-e-lg bg-transparent border text-neutral-600 block flex-1 min-w-0 w-full text-base border-gray-300 p-3" placeholder="4567" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </div>
                            {
                                otpError &&
                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                    {otpError}
                                </p>
                            }
                            <label className='text-md'>Password</label>
                            <div class="flex w-full relative">
                                <span class="inline-flex items-center px-3 text-sm text-neutral-500 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md bg-white">
                                    <svg class={`w-[20px] h-[20px]`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <input type={showPassword ? "text" : "password"} class="rounded-none outline-none rounded-e-lg bg-transparent border text-neutral-600 block flex-1 min-w-0 w-full text-base border-gray-300 p-3" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <a onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-4 text-neutral-600 cursor-pointer'>
                                    {
                                        showPassword ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>

                                    }
                                </a>
                            </div>
                            {
                                passwordError &&
                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                    {passwordError}
                                </p>
                            }
                        </>
                    }
                    {
                        success ?
                            <button onClick={handleChangePassword} className='text-md w-full h-[45px] bg-black rounded-md text-white mt-5' type="submit">
                                {isLoading ? 'Changing...' : 'Change'}
                            </button> :
                            <button onClick={handleRequestOTP} className='text-md w-full h-[45px] bg-black rounded-md text-white mt-5' type="submit">
                                {isLoading ? 'Requesting...' : 'Request'}
                            </button>
                    }
                    <div className="w-full flex justify-end -mt-1">
                        <Link to="/login" className='text-black hover:text-primary text-sm'>Remember your password ?</Link>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ForgotPassword;
