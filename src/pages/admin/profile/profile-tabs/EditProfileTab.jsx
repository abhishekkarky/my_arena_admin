import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { Field, Form, Formik } from 'formik';
import moment from 'moment-timezone';
import React, { useState } from 'react';
import * as Yup from 'yup';

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

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const EditProfileTab = () => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const [updated, setIsUpdated] = useState(false)
    const [user, setUser] = useState('');
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [number, setNumber] = useState('')
    const [userTimeZone, setUserTimeZone] = useState(0)
    const [imageView, setImageView] = useState(false)
    const [userImage, setUserImage] = useState('')
    const [previewImage, setPreviewImage] = useState(null);

    const profileValidationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full name is required'),
        email: Yup.string().required('Email is required').email('Invalid Email address'),
        address: Yup.string().required('Address is required'),
        number: Yup.string().required('Number is required')
    })

    // useEffect(() => {
    //     getUserByIdApi(localUser._id).then((res) => {
    //         setUser(res.data.userDetail);
    //         setFullName(res.data.userDetail.fullName);
    //         setEmail(res.data.userDetail.email);
    //         setAddress(res.data.userDetail.address);
    //         setNumber(res.data.userDetail.number);
    //         setUserImage(res.data.userDetail.userImageUrl);
    //         setWantsScheduledNotification(res.data.userDetail.wantsScheduledNotifications);
    //         setImageView(res.data.userDetail.useImageInBroadcast)
    //         setUserTimeZone(res.data.userDetail.userTimeZone)
    //         setTotalCredit(res.data.userDetail.totalCredit)
    //     })
    // }, [updated])

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
            const maxFileSize = 1024 * 1024;

            if (allowedFormats.includes(file.type)) {
                if (file.size <= maxFileSize) {
                    setUserImage(file);
                    setPreviewImage(URL.createObjectURL(file));
                    handleImageUploadAndSubmit(file);
                } else {
                    // addToast('Image size exceeds 1 MB. Please select a smaller size image.', {
                    //     appearance: 'info',
                    //     autoDismiss: true,
                    // });
                }
            } else {
                // addToast('File format not supported. Please select a .png, .jpeg, or .jpg file.', {
                //     appearance: 'info',
                //     autoDismiss: true,
                // })
            }
        } else {
            console.log('No file selected');
        }
    };


    const handleImageUploadAndSubmit = (userImage) => {
        const formData = new FormData();
        formData.append("userImage", userImage)
        console.log(userImage)

        // updateUserImageApi(localUser._id, formData)
        //     .then((res) => {
        //         if (res.data.success === true) {
        //             addToast(res.data.message, {
        //                 appearance: 'success',
        //                 autoDismiss: 'true'
        //             })
        //             setIsUpdated((v) => !v)
        //         } else {
        //             addToast(res.data.message, {
        //                 appearance: 'error',
        //                 autoDismiss: 'true'
        //             })
        //         }
        //     })
        //     .catch((err) => {
        //         if (err.response && err.response.status === 403) {
        //             addToast(err.response.data.message, {
        //                 appearance: 'error',
        //                 autoDismiss: 'true'
        //             })
        //         } else {
        //             addToast(err.response.data.message, {
        //                 appearance: 'error',
        //                 autoDismiss: 'true'
        //             })
        //             console.log(err.message);
        //         }
        //     });
    }

    const handleSubmit = async (props) => {
        // editUserApi(localUser._id, props)
        //     .then((res) => {
        //         if (res.data.success === true) {
        //             addToast(res.data.message, {
        //                 appearance: 'success',
        //                 autoDismiss: 'true'
        //             })
        //             setIsUpdated((v) => !v)
        //             window.location.reload();
        //         } else {
        //             addToast(res.data.message, {
        //                 appearance: 'error',
        //                 autoDismiss: 'true'
        //             })
        //         }
        //     })
        //     .catch((err) => {
        //         if (err.response && err.response.status === 403) {
        //             addToast(err.response.data.message, {
        //                 appearance: 'error',
        //                 autoDismiss: 'true'
        //             })
        //         } else {
        //             addToast(err.response.data.message, {
        //                 appearance: 'error',
        //                 autoDismiss: 'true'
        //             })
        //             console.log(err.message);
        //         }
        //     });
    }

    const getAllTimeZones = () => {
        return moment.tz.names();
    }

    return (
        <>
            <main className='bg-white p-6 -m-4 rounded-[8px] text-neutral-700 border'>
                <Formik
                    enableReinitialize={true}
                    initialValues={{ fullName: fullName, email: email, address: address, number: number, userTimeZone: userTimeZone }}
                    validationSchema={profileValidationSchema}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                >
                    {(props) => (
                        <Form className='flex flex-col gap-y-5'>
                            <h1 className='text-2xl mb-2'>Edit </h1>
                            <div className='flex flex-col'>
                                <div className='flex justify-start items-center'>
                                    <img src={previewImage || (userImage || '/assets/images/userImage.png')} className='image-preview w-[120px] h-[120px] object-cover rounded-full' alt="" />
                                    <div className="ml-4 w-full flex flex-col items-start justify-around gap-y-1">
                                        <p className='font-medium text-lg'>Profile picture</p>
                                        <Button
                                            sx={{
                                                color: '#404040',
                                            }}
                                            style={{ fontFamily: 'Roboto Slab, Serif', borderColor: '#737373', textTransform: 'unset', fontWeight: 'normal', marginTop: '10px' }}
                                            component="label"
                                            role={undefined}
                                            variant="outlined"
                                            tabIndex={-1}
                                            className='text-neutral-700'
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload
                                            <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full flex flex-wrap justify-between mt-7 gap-y-3">
                                    <div className="flex flex-col md:w-[48%] w-[300px]">
                                        <label>Fullname</label>
                                        <Field className='border rounded-md p-3 outline-none mt-2 w-full' id="fullName" name="fullName" placeholder="John Doe" value={props.values.fullName} onChange={props.handleChange("fullName")} />
                                        {props.errors.fullName &&
                                            props.touched.fullName ?
                                            (
                                                <p className='text-[12px] text-[#dc3545]'>
                                                    {props.errors.fullName}
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                    <div className="flex flex-col md:w-[48%] w-[300px]">
                                        <label>Email</label>
                                        <Field className='border rounded-md p-3 outline-none mt-2 w-full' id="email" name="email" placeholder="johndoe@gmail.com" value={props.values.email} onChange={props.handleChange("email")} />
                                        {props.errors.email &&
                                            props.touched.email ?
                                            (
                                                <p className='text-[12px] text-[#dc3545]'>
                                                    {props.errors.email}
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full flex flex-wrap justify-between mt-7 gap-y-3">
                                    <div className="flex flex-col md:w-[48%] w-[300px]">
                                        <label>Address</label>
                                        <Field className='border rounded-md p-3 outline-none mt-2 w-full' id="address" name="address" placeholder="Kathmandu" value={props.values.address} onChange={props.handleChange("address")} />
                                        {props.errors.address &&
                                            props.touched.address ?
                                            (
                                                <p className='text-[12px] text-[#dc3545]'>
                                                    {props.errors.address}
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                    <div className="flex flex-col md:w-[48%] w-[300px]">
                                        <label>Contact Number</label>
                                        <Field className='border rounded-md p-3 outline-none mt-2 w-full' id="number" name="number" placeholder="98********" value={props.values.number} onChange={props.handleChange("number")} />
                                        {props.errors.number &&
                                            props.touched.number ?
                                            (
                                                <p className='text-[12px] text-[#dc3545]'>
                                                    {props.errors.number}
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                    <div className="flex flex-col md:w-[48%] w-[300px] mt-4">
                                        <label>Select your timezone</label>
                                        <Field
                                            as="select"
                                            className='border rounded-md p-3 h-[45px] outline-none mt-2 w-full'
                                            id="userTimeZone"
                                            name="userTimeZone"
                                            value={props.values.userTimeZone}
                                            onChange={props.handleChange("userTimeZone")}
                                        >
                                            <option value="">Select Timezone</option>
                                            {getAllTimeZones().map((timezone, index) => (
                                                <option key={index} value={timezone}>{timezone}</option>
                                            ))}
                                        </Field>
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

export default EditProfileTab