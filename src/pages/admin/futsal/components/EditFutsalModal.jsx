import DialogContent from '@mui/joy/DialogContent';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { Transition } from 'react-transition-group';
import * as Yup from 'yup';
import { getFutsalByIdApi, updateFutsalApi } from '../../../../apis/api';

const EditFutsalModal = ({ open, onClose, futsalId, setIsUpdated }) => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const [futsalImage, setFutsalImage] = useState(null);
    const [futsal, setFutsal] = useState(null);
    const [responseFutsalImage, setResponseFutsalImage] = useState(null);
    const [futsalName, setFutsalName] = useState(null);
    const [futsalLocation, setFutsalLocation] = useState(null);
    const [futsalGroundSize, setFutsalGroundSize] = useState(null);
    const [futsalPrice, setFutsalPrice] = useState(null);
    const [futsalLat, setFutsalLat] = useState(null);
    const [futsalLong, setFutsalLong] = useState(null);
    const [futsalStartTime, setFutsalStartTime] = useState(null);
    const [futsalEndTime, setFutsalEndTime] = useState(null);
    const [futsalDayOfWeek, setFutsalDayOfWeek] = useState(null);
    const [previewFutsalImage, setPreviewFutsalImage] = useState(null);

    const editFutsalValidation = Yup.object().shape({
        name: Yup.string().required('Futsal name is required'),
        location: Yup.string().required('Futsal location is required'),
        groundSize: Yup.string().required('Futsal ground size is required'),
        price: Yup.string().required('Futsal price is required'),
        lat: Yup.string().required('Futsal latitude is required'),
        long: Yup.string().required('Futsal longitude is required'),
        startTime: Yup.string().required('Futsal start time is required'),
        endTime: Yup.string().required('Futsal end time is required'),
        dayOfWeek: Yup.string().required('Futsal day of week is required'),
    })

    const weeks = [
        { value: 'Sunday', label: 'Sunday' },
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' }
    ]

    useEffect(() => {
        if (futsalId) {
            getFutsalByIdApi(futsalId).then(response => {
                if (response.data.success) {
                    setFutsal(response.data.futsal);
                    setFutsalName(response.data.futsal.name);
                    setFutsalLocation(response.data.futsal.location);
                    setFutsalGroundSize(response.data.futsal.groundSize);
                    setFutsalPrice(response.data.futsal.price);
                    setFutsalLat(response.data.futsal.lat);
                    setFutsalLong(response.data.futsal.long);
                    setFutsalStartTime(response.data.futsal.startTime);
                    setFutsalEndTime(response.data.futsal.endTime);
                    setFutsalDayOfWeek(response.data.futsal.dayOfWeek);
                    setPreviewFutsalImage(response.data.futsal.futsalImageUrl);
                }
            }).catch(error => {
                console.error("Error fetching futsal details:", error);
            });
        }
    }, [futsalId]);

    if (!open) return null;

    const handleFutsalImage = (e) => {
        setFutsalImage(e.target.files[0]);
        setPreviewFutsalImage(URL.createObjectURL(e.target.files[0]));
    }
    const handleUpdate = async (props) => {
        console.log(props)
        const formData = new FormData();
        formData.append('name', props.name);
        formData.append('location', props.location);
        formData.append('groundSize', props.groundSize);
        formData.append('price', props.price);
        formData.append('lat', props.lat);
        formData.append('long', props.long);
        formData.append('startTime', props.startTime);
        formData.append('endTime', props.endTime);
        formData.append('dayOfWeek', props.dayOfWeek);
        formData.append('futsalImage', futsalImage);
        updateFutsalApi(futsalId, formData).then((res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                onClose();
                setFutsalImage(null);
                setPreviewFutsalImage(null);
                setIsUpdated((v) => !v)
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            if (err.response && err.response.status === 403) {
                toast.error(err.response.data.message);
            } else {
                toast.error('☹ Server is not responding ☹');
            }
        })
    }
    return (
        <React.Fragment>
            <Transition in={open} timeout={400}>
                {(state) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={onClose}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 400ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                        entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    }[state],
                                },
                            },
                        }}
                        sx={{
                            visibility: state === 'exited' ? 'hidden' : 'visible',
                        }}
                    >
                        <ModalDialog
                            sx={{
                                padding: 0,
                                opacity: 0,
                                border: 0,
                                overflow: 'hidden',
                                transition: `opacity 300ms`,
                                ...{
                                    entering: { opacity: 1 },
                                    entered: { opacity: 1 },
                                }[state],
                            }}
                        >
                            <DialogContent>
                                <Formik
                                    enableReinitialize
                                    initialValues={{ name: futsalName, location: futsalLocation, groundSize: futsalGroundSize, price: futsalPrice, lat: futsalLat, long: futsalLong, startTime: futsalStartTime, endTime: futsalEndTime, dayOfWeek: futsalDayOfWeek }}
                                    validationSchema={editFutsalValidation}
                                    onSubmit={(values) => {
                                        handleUpdate(values);
                                    }}
                                >
                                    {(props) => (
                                        <Form className="sm:min-w-[640px] w-full h-auto flex flex-col gap-y-3 mx-auto my-auto text-neutral-700 border rounded-lg p-4">
                                            <p className='text-2xl mb-3'>Update <span className='text-green-600 mr-2'>{futsalName}</span></p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-3">
                                                    <label className='text-md'>Futsal Name</label>
                                                    <Field className='border rounded-md p-3 outline-none' type='text' placeholder="Futsal Name" value={props.values.name} onChange={props.handleChange("name")} />
                                                    {props.errors.name ??
                                                        props.touched.name ? (
                                                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                            {props.errors.name}
                                                        </p>
                                                    ) : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <label className='text-md'>Futsal Location</label>
                                                    <Field className='border rounded-md p-3 outline-none' type='text' placeholder="Futsal Location" value={props.values.location} onChange={props.handleChange("location")} />
                                                    {props.errors.location ??
                                                        props.touched.location ? (
                                                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                            {props.errors.location}
                                                        </p>
                                                    ) : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-3">
                                                    <label className='text-md'>Futsal Ground Size</label>
                                                    <Field className='border rounded-md p-3 outline-none' type='text' placeholder="Futsal Ground Size" value={props.values.groundSize} onChange={props.handleChange("groundSize")} />
                                                    {props.errors.groundSize ??
                                                        props.touched.groundSize ? (
                                                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                            {props.errors.groundSize}
                                                        </p>
                                                    ) : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <label className='text-md'>Price Per Hour</label>
                                                    <Field className='border rounded-md p-3 outline-none' type='number' placeholder="1000" value={props.values.price} onChange={props.handleChange("price")} />
                                                    {props.errors.price ??
                                                        props.touched.price ? (
                                                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                            {props.errors.price}
                                                        </p>
                                                    ) : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-3">
                                                    <label className='text-md'>Latitude</label>
                                                    <Field className='border rounded-md p-3 outline-none' type='number' placeholder="89.123" value={props.values.lat} onChange={props.handleChange("lat")} />
                                                    {props.errors.lat ??
                                                        props.touched.lat ? (
                                                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                            {props.errors.lat}
                                                        </p>
                                                    ) : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <label className='text-md'>Longitude</label>
                                                    <Field className='border rounded-md p-3 outline-none' type='number' placeholder="57.123" value={props.values.long} onChange={props.handleChange("long")} />
                                                    {props.errors.long ??
                                                        props.touched.long ? (
                                                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                            {props.errors.long}
                                                        </p>
                                                    ) : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-3">
                                                    <label className='text-md'>StartTime</label>
                                                    <Field className='border rounded-md p-3 outline-none' type='time' value={props.values.startTime} onChange={props.handleChange("startTime")} />
                                                    {props.errors.startTime ??
                                                        props.touched.startTime ? (
                                                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                            {props.errors.startTime}
                                                        </p>
                                                    ) : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <label className='text-md'>EndTime</label>
                                                    <Field className='border rounded-md p-3 outline-none' type='time' value={props.values.endTime} onChange={props.handleChange("endTime")} />
                                                    {props.errors.endTime ??
                                                        props.touched.endTime ? (
                                                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                            {props.errors.endTime}
                                                        </p>
                                                    ) : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-3">
                                                    <label className='text-md'>Open in week</label>
                                                    <Select
                                                        options={weeks}
                                                        isMulti
                                                        onChange={(selectedOptions) =>
                                                            props.setFieldValue('dayOfWeek', selectedOptions.map(option => option.value).join(', '))
                                                        }
                                                    />
                                                    {props.errors.dayOfWeek ??
                                                        props.touched.dayOfWeek ? (
                                                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                            {props.errors.dayOfWeek}
                                                        </p>
                                                    ) : null
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <label className='text-md'>Futsal Image</label>
                                                    <input class="border rounded-md p-2.5 outline-none text-sm" type="file" onChange={(e) => handleFutsalImage(e)} />
                                                    {props.errors.futsalImageUrl ??
                                                        props.touched.futsalImageUrl ? (
                                                        <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                            {props.errors.futsalImageUrl}
                                                        </p>
                                                    ) : null
                                                    }
                                                </div>
                                            </div>
                                            {previewFutsalImage && (
                                                <img src={previewFutsalImage} alt="futsalImage" className="w-full h-[200px] object-cover rounded-md mt-5" />
                                            )}

                                            {/* <Field className='border rounded-md p-3 outline-none' type="password" placeholder='********' value={props.values.newPassword} onChange={props.handleChange("newPassword")} />
                                            {props.errors.newPassword
                                                ?? props.touched.newPassword ? (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.newPassword}
                                                </p>
                                            ) : null
                                            }
                                            <label className='text-md'>Confirm Password</label>
                                            <Field className='border rounded-md p-3 outline-none' type="password" placeholder='********' value={props.values.confirmPassword} onChange={props.handleChange("confirmPassword")} />
                                            {props.errors.confirmPassword
                                                ?? props.touched.confirmPassword ? (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.confirmPassword}
                                                </p>
                                            ) : null
                                            } */}
                                            <button className='text-md w-[150px] h-[40px] bg-black rounded-md text-white mt-5' type="submit">Update Futsal</button>
                                        </Form>
                                    )}

                                </Formik>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </React.Fragment>
    );
}

export default EditFutsalModal;
