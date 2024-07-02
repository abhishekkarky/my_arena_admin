import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { editUserApi, getUserByIdApi, updateUserImageApi } from '../../apis/api';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const SuperAdminProfile = () => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const [updated, setIsUpdated] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [number, setNumber] = useState('')
    const [userImage, setUserImage] = useState('')
    const [previewImage, setPreviewImage] = useState(null);

    const profileValidationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full name is required'),
        email: Yup.string().required('Email is required').email('Invalid Email address'),
        address: Yup.string().required('Address is required'),
        number: Yup.string().required('Number is required')
    })

    useEffect(() => {
        getUserByIdApi(localUser._id).then((res) => {
            setFullName(res.data.userDetail.fullName);
            setEmail(res.data.userDetail.email);
            setAddress(res.data.userDetail.address);
            setNumber(res.data.userDetail.number);
            setUserImage(res.data.userDetail.userImageUrl);
        })
    }, [updated])

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
            if (allowedFormats.includes(file.type)) {
                setUserImage(file);
                setPreviewImage(URL.createObjectURL(file));
                handleImageUploadAndSubmit(file);
            } else {
                toast.error('File format not supported. Please select a .png, .jpeg, or .jpg file.');
            }
        } else {
            console.log('No file selected');
        }
    };


    const handleImageUploadAndSubmit = (userImage) => {
        const formData = new FormData();
        formData.append("userImage", userImage)
        console.log(userImage)

        updateUserImageApi(localUser._id, formData)
            .then((res) => {
                if (res.data.success === true) {
                    toast.success(res.data.message)
                    setIsUpdated((v) => !v)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                    toast.error(err.response.data.message)
                } else {
                    toast.error(err.response.data.message)
                    console.log(err.message);
                }
            });
    }

    const handleSubmit = async (props) => {
        editUserApi(localUser._id, props)
            .then((res) => {
                if (res.data.success === true) {
                    toast.success(res.data.message)
                    setIsUpdated((v) => !v)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                    toast.error(err.response.data.message)
                } else {
                    toast.error(err.response.data.message)
                    console.log(err.message);
                }
            });
    }

    return (
        <>
            <main className='rounded-lg max-w-[1440px] flex flex-col w-full mx-auto md:p-10 p-4' style={{ minHeight: 'calc(100vh - 64px)' }}>
                <Formik
                    enableReinitialize={true}
                    initialValues={{ fullName: fullName, email: email, address: address, number: number }}
                    validationSchema={profileValidationSchema}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                >
                    {(props) => (
                        <Form className='flex flex-col gap-y-5 md:my-auto my-0'>
                            <h1 className='text-2xl mb-2'>Edit Profile</h1>
                            <div className='flex flex-col'>
                                <div className='flex justify-start items-center'>
                                    <img src={previewImage || (userImage || '/assets/images/default_user.png')} className='image-preview w-[120px] h-[120px] object-cover rounded-full' alt="" />
                                    <div className="ml-4 w-full flex flex-col items-start justify-around gap-y-1">
                                        <p className='font-medium text-lg'>Profile picture</p>
                                        <Button
                                            style={{ fontFamily: 'Roboto Slab, Serif', borderColor: '#EEEDEB', textTransform: 'unset', fontWeight: 'normal', marginTop: '10px', color: '#31363F' }}
                                            component="label"
                                            role={undefined}
                                            variant="outlined"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload
                                            <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full flex flex-wrap justify-between mt-7 gap-y-3">
                                    <div className="flex flex-col md:w-[48%] w-full">
                                        <label>Fullname</label>
                                        <Field className='border rounded-md p-3 outline-none mt-2 w-full' id="fullName" name="fullName" placeholder="John Doe" value={props.values.fullName} onChange={props.handleChange("fullName")} />
                                        {props.errors.fullName &&
                                            props.touched.fullName ?
                                            (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.fullName}
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                    <div className="flex flex-col md:w-[48%] w-full">
                                        <label>Email</label>
                                        <Field className='border rounded-md p-3 outline-none mt-2 w-full' id="email" name="email" placeholder="johndoe@gmail.com" value={props.values.email} onChange={props.handleChange("email")} />
                                        {props.errors.email &&
                                            props.touched.email ?
                                            (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.email}
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full flex flex-wrap justify-between mt-7 gap-y-3">
                                    <div className="flex flex-col md:w-[48%] w-full">
                                        <label>Address</label>
                                        <Field className='border rounded-md p-3 outline-none mt-2 w-full' id="address" name="address" placeholder="Kathmandu" value={props.values.address} onChange={props.handleChange("address")} />
                                        {props.errors.address &&
                                            props.touched.address ?
                                            (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.address}
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                    <div className="flex flex-col md:w-[48%] w-full">
                                        <label>Contact Number</label>
                                        <Field className='border rounded-md p-3 outline-none mt-2 w-full' id="number" name="number" placeholder="98********" value={props.values.number} onChange={props.handleChange("number")} />
                                        {props.errors.number &&
                                            props.touched.number ?
                                            (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.number}
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <div className="md:flex md:flex-row flex-col items-end justify-end w-full mt-4 p-4 rounded-[8px] gap-y-5">
                                    <button className='px-6 py-2 bg-red-500 border-none rounded-md text-md text-white' type="reset">Reset</button>
                                    <button className='px-6 py-2 bg-black border-none rounded-md text-md text-white ml-3' type="submit">Submit</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </main>
        </>
    )
}

export default SuperAdminProfile