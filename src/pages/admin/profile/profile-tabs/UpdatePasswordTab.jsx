import DialogContent from '@mui/joy/DialogContent';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { Transition } from 'react-transition-group';
import * as Yup from 'yup';

const UpdatePasswordTab = ({ open, onClose }) => {
    const localUser = JSON.parse(localStorage.getItem('user'));

    const updatePasswordValidation = Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required').min(8, 'Password cannot be less than 8 characters'),
        newPassword: Yup.string().required('New password is required').min(8, 'New password cannot be less than 8 characters'),
        confirmPassword: Yup.string().required('Confirm password is required').min(8, 'Confirm password cannot be less than 8 characters').oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
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
                                    initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                                    validationSchema={updatePasswordValidation}
                                    onSubmit={(values) => {
                                        handleSubmit(values);
                                    }}
                                >
                                    {(props) => (
                                        <Form className="md:w-[400px] w-full h-auto flex flex-col gap-y-3 mx-auto my-auto text-neutral-700 border rounded-lg p-4">
                                            <p className='text-2xl mb-3'>Update <span className='text-primary mr-2'>Password</span></p>
                                            <label className='text-md'>Current Password</label>
                                            <Field className='border rounded-md p-3 outline-none' type='password' id="currentPassword" name="currentPassword" placeholder="********" value={props.values.currentPassword} onChange={props.handleChange("currentPassword")} />
                                            {props.errors.currentPassword ??
                                                props.touched.currentPassword ? (
                                                <p className='text-[12px]' style={{ color: "#dc3545" }}>
                                                    {props.errors.currentPassword}
                                                </p>
                                            ) : null
                                            }
                                            <label className='text-md'>New Password</label>
                                            <Field className='border rounded-md p-3 outline-none' type="password" placeholder='********' value={props.values.newPassword} onChange={props.handleChange("newPassword")} />
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
                                            }
                                            <button className='text-md w-[150px] h-[40px] bg-black rounded-md text-white mt-5' type="submit">Update</button>
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

export default UpdatePasswordTab;
