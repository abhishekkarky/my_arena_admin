import DialogContent from '@mui/joy/DialogContent';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactSelect from 'react-select';
import { Transition } from 'react-transition-group';
import { createBookingApi, getAllAvailableTimeSlotsApi, getAllFutsalForBookingApi } from '../../../../apis/api';
import moment from 'moment';

const AddBookingModal = ({ open, onClose, setIsUpdated }) => {
    const today = moment().format('YYYY-MM-DD');
    const [futsals, setFutsals] = useState([]);
    const [formData, setFormData] = useState({
        user: '',
        futsal: '',
        date: '',
        timeSlot: '',
        paid: false
    });
    const [errors, setErrors] = useState({});
    const [timeSlotOptions, setTimeSlotOptions] = useState([]);

    useEffect(() => {
        if (open) {
            getAllFutsalForBookingApi().then(res => {
                if (res.data.success) {
                    setFutsals(res.data.futsals);
                } else {
                    toast.error('Could not fetch futsal data');
                }
            });
        }
    }, [open]);

    const validateForm = () => {
        let formErrors = {};
        if (!formData.user || formData.user.length !== 10) {
            formErrors.user = 'User is required and must be 10 digits';
        }
        if (!formData.futsal) {
            formErrors.futsal = 'Futsal is required';
        }
        if (!formData.date) {
            formErrors.date = 'Date is required';
        }
        if (!formData.timeSlot) {
            formErrors.timeSlot = 'Time slot is required';
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, option) => {
        setFormData(prev => ({ ...prev, [name]: option }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const bookingData = {
            ...formData,
            date: moment(formData.date),
            timeSlot: formData.timeSlot.map(slot => slot.label)
        };
        createBookingApi(bookingData).then(res => {
            if (res.data.success) {
                toast.success(res.data.message);
                setIsUpdated((v) => !v);
                onClose();
            }
        }).catch(err => {
            if (err.response && err.response.status === 403) {
                toast.error(err.response.data.message);
            }
        });
    };

    useEffect(() => {
        if (formData.futsal && formData.date) {
            getAllAvailableTimeSlotsApi(formData.futsal, formData.date).then(res => {
                if (res.data.success) {
                    setTimeSlotOptions(res.data.timeSlots.map(slot => ({ label: `${slot.startTime} - ${slot.endTime}`, value: slot._id })));
                } else {
                    setTimeSlotOptions([]);
                    toast.error('Failed to fetch time slots');
                }
            }).catch(err => {
                if (err.response && err.response.status === 403) {
                    toast.error(err.response.data.message);
                    setTimeSlotOptions([]);
                }
            });
        }
    }, [formData.futsal, formData.date]);

    return (
        <React.Fragment>
            <Transition in={open} timeout={400}>
                {(state) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={onClose}
                        sx={{ visibility: state === 'exited' ? 'hidden' : 'visible' }}
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
                                <form onSubmit={handleSubmit} className="md:w-[400px] w-full h-auto flex flex-col gap-y-3 mx-auto my-auto text-neutral-700 border rounded-lg p-4">
                                    <p className='text-2xl mb-3'>Add <span className='text-green-600 mr-2'>Booking</span></p>
                                    <label className='text-md'>User</label>
                                    <input
                                        type='tel'
                                        name="user"
                                        placeholder="9800000000"
                                        value={formData.user}
                                        onChange={handleChange}
                                        className='border rounded-md p-3 outline-none'
                                    />
                                    {errors.user && <p className='text-[12px]' style={{ color: "#dc3545" }}>{errors.user}</p>}
                                    <label className='text-md'>Which Futsal?</label>
                                    <select
                                        name="futsal"
                                        value={formData.futsal}
                                        onChange={handleChange}
                                        className='border rounded-md p-3 outline-none h-[50px]'
                                    >
                                        <option value="">Select Futsal</option>
                                        {futsals.map(futsal => (
                                            <option key={futsal._id} value={futsal._id}>{futsal.location}</option>
                                        ))}
                                    </select>
                                    {errors.futsal && <p className='text-[12px]' style={{ color: "#dc3545" }}>{errors.futsal}</p>}                                    <label className='text-md'>Select Date</label>
                                    <input
                                        type='date'
                                        name="date"
                                        min={today}
                                        value={formData.date}
                                        onChange={handleChange}
                                        className='border rounded-md p-3 outline-none'
                                    />
                                    {errors.date && <p className='text-[12px]' style={{ color: "#dc3545" }}>{errors.date}</p>}
                                    <label className='text-md'>Time Slot</label>
                                    <ReactSelect
                                        isMulti
                                        name="timeSlot"
                                        options={timeSlotOptions}
                                        onChange={option => handleSelectChange('timeSlot', option)}
                                    />
                                    {errors.timeSlot && <p className='text-[12px]' style={{ color: "#dc3545" }}>{errors.timeSlot}</p>}
                                    <label className='text-md'>Payment</label>
                                    <select
                                        name="paid"
                                        value={formData.paid}
                                        onChange={handleChange}
                                        className='border rounded-md p-3 outline-none h-[50px]'
                                    >
                                        <option value="false">Unpaid</option>
                                        <option value="true">Paid</option>
                                    </select>
                                    {errors.paid && <p className='text-[12px]' style={{ color: "#dc3545" }}>{errors.paid}</p>}
                                    <button type="submit" className='w-[150px] h-[40px] bg-black rounded-md text-white mt-5'>Add Booking</button>
                                </form>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </React.Fragment>
    );
};

export default AddBookingModal;