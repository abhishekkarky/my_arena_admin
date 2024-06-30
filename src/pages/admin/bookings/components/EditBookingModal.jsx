import DialogContent from '@mui/joy/DialogContent';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Transition } from 'react-transition-group';
import * as Yup from 'yup';

const EditBookingModal = ({ open, onClose }) => {
    const localUser = JSON.parse(localStorage.getItem('user'));

    const addBookingValidation = Yup.object().shape({
        user: Yup.string().required('User is required').length(10, 'User must be 10 digits'),
        futsal: Yup.string().required('Futsal is required'),
        timeSlot: Yup.string().required('Time slot is required'),
    })

    const handleSubmit = async (props) => {
        console.log(props)
        // editUserPassword(localUser._id, props).then((res) => {
        //     if (res.data.success === true) {
        //         addToast(res.data.message, {
        //             appearance: "success",
        //             autoDismiss: "true",
        //         });
        //         onClose()
        //     }
        //     else {
        //         addToast(res.data.message, {
        //             appearance: "error",
        //             autoDismiss: "true",
        //         });
        //     }
        // }).catch(err => {
        //     if (err.response && err.response.status === 403) {
        //         addToast(err.response.data.message, {
        //             appearance: "error",
        //             autoDismiss: "true",
        //         });
        //     } else {
        //         addToast('Something went wrong', {
        //             appearance: "error",
        //             autoDismiss: "true",
        //         });
        //         console.log(err.message);
        //     }
        // })
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
                                    initialValues={{ user: '', futsal: '', timeSlot: '', paid: false }}
                                    validationSchema={addBookingValidation}
                                    onSubmit={(values) => {
                                        handleSubmit(values);
                                    }}
                                >
                                    {(props) => (
                                        <Form className="md:w-[400px] w-full h-auto flex flex-col gap-y-3 mx-auto my-auto text-neutral-700 border rounded-lg p-4">
                                            <p className='text-2xl mb-3'>Update <span className='text-green-600 mr-2'>Booking Name</span></p>
                                            <label className='text-md'>User</label>
                                            <Field className='border rounded-md p-3 outline-none' disabled type='tel' name="user" placeholder="9800000000" value={props.values.user} onChange={props.handleChange("user")} />
                                            {props.errors.user ??
                                                props.touched.user ? (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.user}
                                                </p>
                                            ) : null
                                            }
                                            <label className='text-md'>Which Futsal?</label>
                                            <select value={props.values.futsal} onChange={props.handleChange("futsal")} className='border rounded-md p-3 outline-none h-[50px]' name="futsal">
                                                <option value="">Select Futsal</option>
                                                <option value="Futsal 1">Futsal 1</option>
                                                <option value="Futsal 2">Futsal 2</option>
                                                <option value="Futsal 3">Futsal 3</option>
                                                <option value="Futsal 4">Futsal 4</option>
                                            </select>
                                            {props.errors.futsal
                                                ?? props.touched.futsal ? (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.futsal}
                                                </p>
                                            ) : null
                                            }
                                            <label className='text-md'>Time Slot</label>
                                            <select value={props.values.timeSlot} onChange={props.handleChange("timeSlot")} className='border rounded-md p-3 outline-none h-[50px]' name="timeSlot">
                                                <option value="">Select Time Slot</option>
                                                <option value="10:00 AM - 11:00 A.M">10:00 AM - 11:00 A.M</option>
                                                <option value="11:00 AM - 12:00 P.M">11:00 AM - 12:00 P.M</option>
                                                <option value="12:00 P.M - 01:00 P.M">12:00 P.M - 01:00 P.M</option>
                                                <option value="01:00 P.M - 02:00 P.M">01:00 P.M - 02:00 P.M</option>
                                                <option value="02:00 P.M - 03:00 P.M">02:00 P.M - 03:00 P.M</option>
                                            </select>
                                            {props.errors.timeSlot
                                                ?? props.touched.timeSlot ? (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.timeSlot}
                                                </p>
                                            ) : null
                                            }
                                            <label className='text-md'>Payment</label>
                                            <select value={props.values.paid} onChange={props.handleChange("paid")} className='border rounded-md p-3 outline-none h-[50px]' name="paid">
                                                <option value="">Select Payment</option>
                                                <option value="true">Paid</option>
                                                <option value="false">Unpaid</option>
                                            </select>
                                            {props.errors.paid
                                                ?? props.touched.paid ? (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.paid}
                                                </p>
                                            ) : null
                                            }
                                            <button className='text-md w-[150px] h-[40px] bg-black rounded-md text-white mt-5' type="submit">Update Booking</button>
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

export default EditBookingModal;
