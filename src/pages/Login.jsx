import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { loginUserApi } from '../apis/api';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.role === 'vendor') {
                window.location.replace('/vendor/dashboard');
            } else if (parsedUser.role === 'superadmin') {
                window.location.replace('/superadmin/dashboard');
            } else {
                window.location.replace('/admin/login');
                return;
            }
        }
    }, []);

    const LoginSchema = Yup.object().shape({
        number: Yup.string().required("Number is required").length(10, "Number must be 10 digits"),
        password: Yup.string().required("Password is required").min(8, "Password must be minimum of 8 characters")
    })

    const handleLogin = async (props) => {
        setIsLoading(true);
        const data = {
            number: props.number,
            password: props.password,
            userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
        loginUserApi(data).then((res) => {
            if (res.data.success) {
                setIsLoading(false);
                setErrorMsg('')
                if (res.data.user.role === 'customer') {
                    setErrorMsg('☹ Access Denied ☹')
                    return;
                } else if (res.data.user.role === 'vendor') {
                    setSuccessMsg(res.data.message)
                    window.location.replace('/vendor/dashboard');
                } else if (res.data.user.role === 'superadmin') {
                    setSuccessMsg(res.data.message)
                    window.location.replace('/superadmin/dashboard');
                }
                localStorage.setItem('token', res.data.token)
                const jsonDecode = JSON.stringify(res.data.user)
                localStorage.setItem('user', jsonDecode)
            } else {
                setIsLoading(false);
                toast.error(res.data.message)
            }
        }).catch((err) => {
            if (err.response && err.response.status === 403) {
                setIsLoading(false);
                setErrorMsg(err.response.data.message)
            } else {
                setIsLoading(false);
                setErrorMsg("☹ Server is not responding ☹")
            }
        })
    }

    return (
        <main className={`w-full min-h-screen flex justify-center items-center font-roboto-slab bg-white ${isLoading ? 'pointer-events-none' : ''}`}>
            <div className="md:w-[55%] md:block hidden max-h-screen">
                <img className='w-full max-h-screen object-cover' src="/assets/images/auth-img.jpg" alt="" />
            </div>
            <div className="md:w-[45%] w-full h-auto flex flex-col justify-center items-center my-auto">
                <img className='w-[80px] h-[80px] mx-auto' src="/assets/images/my_arena_logo.png" alt="Managepoint Logo" />
                <Formik
                    initialValues={{ number: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        handleLogin(values);
                    }}
                >
                    {(props) => (
                        <Form className="md:w-[90%] max-w-[470px] w-full h-auto flex flex-col gap-y-3 mx-auto my-auto md:p-10 p-5">
                            <p className='text-3xl mx-auto'>Sign <span className='text-primary mr-2'>in</span></p>
                            <p className='text-base mx-auto mb-2 text-center'>Enter your Login details</p>
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
                            {props.errors.password
                                ?? props.touched.password ? (
                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                    {props.errors.password}
                                </p>
                            ) : null
                            }
                            <div className="w-full text-right mb-2 -mt-1"><Link to={'/forgot'} className='text-black hover:text-primary text-sm'>Forgot password ?</Link></div>
                            <button className='text-md w-full h-[45px] bg-black rounded-md text-white' type="submit">
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                            <div className="w-full flex justify-between mb-3 -mt-1">
                                <Link to="/" className='text-black hover:text-primary text-sm'>Back to Homepage ?</Link>
                                <Link to="/signup" className='text-black hover:text-primary text-sm'>No account ?</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}

export default Login;
