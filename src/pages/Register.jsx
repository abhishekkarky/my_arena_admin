import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import CircularProgress from '@mui/material/CircularProgress';
import { Field, Form, Formik } from "formik";
import { MuiOtpInput } from 'mui-one-time-password-input';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { registerUserApi, verifyNumberApi } from "../apis/api";
import toast from "react-hot-toast";

const Register = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [number, setNumber] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [openTermsAndCondition, setOpenTermsAndCondition] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const registerSchema = Yup.object().shape({
        fullName: Yup.string().required("Full name is required"),
        number: Yup.string().required("Number is required").length(10, 'Number must be 10 digits'),
        password: Yup.string().required("Password is required").min(8, 'Password cannot be less than 8 characters'),
    })

    const otpSchema = Yup.object().shape({
        otp: Yup.string().required("OTP is required").min(4, 'OTP must be 4 digits')
    })

    const navigate = useNavigate();

    const getLocation = () => {
        fetch('https://ipapi.co/json/').then((res) => res.json()).then((data) => {
            setCountry(data?.country_name)
            setCity(data?.city)
        })
    }

    useEffect(() => {
        getLocation();
    }, [])

    const handleSignup = async (props) => {
        setIsloading(true);
        try {
            const userData = {
                fullName: props.fullName,
                number: props.number,
                password: props.password,
                country: country,
                city: city,
            };
            const res = await registerUserApi(userData);
            if (res.data.success) {
                toast.success(res.data.message);
                setIsloading(false);
                setNumber(props.number);
                setShowModal(true);
            } else {
                toast.error(res.data.message);
                setIsloading(false);
            }
        } catch (err) {
            if (err.response && err.response.status === 403) {
                setErrorMsg(err.response.data.message);
                setIsloading(false);
            } else {
                setIsloading(false);
                setErrorMsg("☹ Server is not responding ☹");
                console.error(err);
            }
        }
    };


    const handleVerification = async (props) => {
        setIsloading(true);
        verifyNumberApi(props).then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/login')
                setIsloading(false);
            } else {
                toast.error(res.data.message);
                setIsloading(false);
            }
        }).catch((err) => {
            if (err.response && err.response.status === 403) {
                toast.error(err.response.data.message);
                setIsloading(false);
            } else {
                toast.error('☹ Server is not responding ☹');
                setIsloading(false);
            }
        })
    }

    return (
        <>
            <main className={`w-full min-h-screen h-full flex justify-center items-center font-roboto-slab bg-white ${isLoading ? 'pointer-events-none' : ''}`}>
                <div className="md:w-[55%] md:block hidden min-h-screen h-full">
                    <img className='max-h-screen w-full object-cover' src="/assets/images/auth-img.jpg" alt="" />
                </div>
                <div className="md:w-[45%] w-full max-h-screen flex flex-col justify-center items-center my-auto overflow-auto">
                    <img className='w-[80px] h-[80px] mx-auto' src="/assets/images/my_arena_logo.png" alt="My Arena Logo" />
                    <Formik
                        initialValues={{ fullName: '', number: '', password: '', agreementChecked: false }}
                        validationSchema={registerSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            if (!values.agreementChecked) {
                                toast.error("Please agree to the terms and conditions");
                                setSubmitting(false);
                                return;
                            }
                            handleSignup(values);
                        }}
                    >
                        {(props) => (
                            <Form className="md:w-[90%] max-w-[470px] w-full h-auto flex flex-col gap-y-3 mx-auto my-auto md:px-10 p-5">
                                <p className='text-3xl mx-auto'><span className='text-primary mr-1'>User </span>Sign up</p>
                                <p className='text-base mx-auto mb-2'>Enter your details</p>
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
                                <label className='text-md'>Your Name</label>
                                <div class="flex w-full">
                                    <span class="inline-flex items-center px-3 min-w-[45px] text-sm text-neutral-500 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md bg-white">
                                        <svg class={`w-4 h-4 ${props.errors.fullName ? 'text-red-500' : 'text-gray-500'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                        </svg>
                                    </span>
                                    <Field type="text" class="rounded-none outline-none rounded-e-lg bg-transparent border text-neutral-600 block flex-1 min-w-0 w-full text-base border-gray-300 p-3" placeholder='John Doe' value={props.values.fullName} onChange={props.handleChange("fullName")} />
                                </div>
                                {props.errors.fullName ??
                                    props.touched.fullName ? (
                                    <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                        {props.errors.fullName}
                                    </p>
                                ) : null
                                }
                                <label className='text-md'>Number</label>
                                <div class="flex w-full">
                                    <span class="inline-flex items-center px-3 min-w-[45px] text-sm text-neutral-500 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md bg-white">
                                        <svg class={`w-[18px] h-[18px] ${props.errors.number ? 'text-red-500' : 'text-gray-500'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                                        </svg>
                                    </span>
                                    <Field type="tel" class="rounded-none outline-none rounded-e-lg bg-transparent border text-neutral-600 block flex-1 min-w-0 w-full text-base border-gray-300 p-3" placeholder="9800000000" value={props.values.number} onChange={props.handleChange("number")} />
                                </div>
                                {props.errors.number ??
                                    props.touched.number ? (
                                    <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                        {props.errors.number}
                                    </p>
                                ) : null
                                }
                                <label className='text-md'>Password</label>
                                <div class="flex w-full relative">
                                    <span class="inline-flex items-center px-3 text-sm text-neutral-500 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md bg-white">
                                        <svg class={`w-[20px] h-[20px] ${props.errors.password ? 'text-red-500' : 'text-gray-500'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    <Field type={showPassword ? "text" : "password"} class="rounded-none outline-none rounded-e-lg bg-transparent border text-neutral-600 block flex-1 min-w-0 w-full text-base border-gray-300 p-3" placeholder="********" value={props.values.password} onChange={props.handleChange("password")} />
                                    <a onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-4 text-neutral-600 cursor-pointer'>
                                        {
                                            showPassword ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>

                                        }
                                    </a>
                                </div>
                                {props.errors.password ??
                                    props.touched.password ? (
                                    <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                        {props.errors.password}
                                    </p>
                                ) : null
                                }
                                <div class="flex items-center py-2">
                                    <input
                                        id="link-checkbox"
                                        value={props.values.agreementChecked}
                                        onChange={props.handleChange("agreementChecked")}
                                        type="checkbox"
                                        class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded dark:focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-neutral-700">I agree with the <Link onClick={() => setOpenTermsAndCondition(true)} class="text-primary hover:underline">terms and conditions</Link>.</label>
                                </div>
                                <button className='text-md w-full h-[45px] bg-black rounded-md text-white' type="submit">
                                    {isLoading ? <div className="w-full h-full flex justify-center items-center"><CircularProgress size={22} color="inherit" /></div> : 'Register'}
                                </button>
                                <div className="w-full text-right -mt-1"><Link to="/login" className='text-black hover:text-primary text-sm'>Already have an account ?</Link></div>
                            </Form>
                        )}
                    </Formik>
                </div>


                {/* Verify modal */}
                <Modal open={showModal} onClose={() => setShowModal(false)}>
                    <ModalDialog>
                        <ModalClose />
                        <div className={`relative bg-transparent px-3 py-4 mx-auto w-full max-w-lg rounded-2xl ${isLoading ? 'pointer-events-none' : ''}`}>
                            <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
                                <div className="flex flex-col items-center justify-center text-center space-y-2">
                                    <div className="font-semibold text-3xl text-black">
                                        <p>Account Verification</p>
                                    </div>
                                    <div className="flex flex-row text-sm font-medium text-gray-500 text-center">
                                        <p>Enter the 4-digit verification code that was sent to your number {number}</p>
                                    </div>
                                </div>
                                <Formik
                                    initialValues={{ number: number, otp: '' }}
                                    validationSchema={otpSchema}
                                    onSubmit={(values) => {
                                        handleVerification(values)
                                    }}
                                >
                                    {(props) => (
                                        <Form>
                                            <div className="flex flex-col space-y-8 max-w-xs mx-auto">
                                                <div className="flex flex-row items-center justify-between mx-auto w-full flex-wrap">
                                                    <Field hidden value={props.values.number} onChange={props.handleChange('number')} />
                                                    <MuiOtpInput value={props.values.otp} onChange={props.handleChange('otp')} length={4} />
                                                </div>
                                                <div className="flex flex-col space-y-5">
                                                    <div>
                                                        <button
                                                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-black border-none text-white text-sm shadow-sm"
                                                            type="submit"
                                                        >
                                                            {isLoading ? 'Verifying...' : 'Verify'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </ModalDialog>
                </Modal>
                {/* <TermsAndConditions open={openTermsAndCondition} onClose={() => setOpenTermsAndCondition(false)} /> */}
            </main>
        </>
    )
}

export default Register