import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Clock, Notification } from 'iconsax-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { getAllNotificationsApi, markNotificationsasReadApi } from '../../apis/api'
import handleLogout from '../Logout'

const navigation = [
    { name: 'Futsals', href: '/vendor/futsalList', current: false },
    { name: 'Bookings', href: '/vendor/bookingList', current: false },
    { name: 'Payment Logs', href: '/vendor/paymentLogs', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function VendorNavbar() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [notifications, setNotifications] = useState([]);
    const [notificationIds, setNotificationIds] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        getAllNotificationsApi().then((res) => {
            setNotifications(res.data.notifications);
            const ids = res.data.notifications.map(notification => notification._id);
            setNotificationIds(ids);
        })
    }, [isUpdated])

    const markAsRead = () => {
        const data = {
            notificationIds: notificationIds
        }
        markNotificationsasReadApi(data).then((res) => {
            if (res.data.success) {
                toast.success(res.data.message)
                setIsUpdated((v) => !v)
            } else {
                toast.error(res.data.message)
            }
        })
    }
    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8 shadow-md">
                        <div className="relative flex h-16 items-center justify-between max-w-[1340px] mx-auto">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-700">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <Link to={'/vendor/dashboard'} className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-9 w-auto"
                                        src="/assets/images/my_arena_logo.png"
                                        alt="My Arena"
                                    />
                                </Link>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'text-neutral-800' : 'text-neutral-700',
                                                    'rounded-md px-3 py-2 text-[16px] font-medium',
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    onClick={toggleDrawer}
                                    type="button"
                                    className="relative rounded-full bg-transparent p-1"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    {
                                        notifications.length === 0 ? null : <span className='absolute right-1 top-0 w-[15px] h-[15px] rounded-full bg-green-700 text-white text-[10px] flex justify-center items-center'>{notifications.length}</span>
                                    }
                                    <Notification />
                                </button>
                                <div
                                    className={`absolute top-14 md:right-10 right-0 w-[300px] border bg-white z-50 rounded-md px-3 pt-3 shadow-md transition-opacity duration-300 ease-in-out ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                    style={{ maxHeight: '500px' }}
                                >
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-lg font-bold">Notifications</p>
                                        {
                                            notifications.length > 0 ?
                                                <button className={`${notifications.some(notif => !notif.isRead) ? '' : 'hidden'}`} onClick={markAsRead}>
                                                    <svg className="w-6 h-6 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                    </svg>
                                                </button>
                                                : null}
                                    </div>
                                    <hr className='my-2' />
                                    {
                                        notifications.length === 0 ? <p className='text-center text-base py-2'>No notifications</p> :
                                            notifications.map((notification, index) => (
                                                <div className="flex gap-3 items-start py-2 border-b hover:bg-neutral-50 p-2" key={index}>
                                                    <input type="text" className='w-[35px] h-[35px] rounded-full bg-teal-500 text-center text-white cursor-auto outline-none' readOnly defaultValue={'N'} />
                                                    <div className="w-full flex flex-col gap-1">
                                                        <p>Booking Alert !</p>
                                                        <p className='text-[15px]'>Dear {localUser.fullName.split(' ')[0]}! {notification?.booking?.futsal?.name} has been booked by {notification?.booking?.user?.fullName} for {moment(notification?.booking?.date).format('MMM Do, YYYY (dddd)')} please check your bookings logs.</p>
                                                        <div className="flex gap-1 items-center text-xs mt-1">
                                                            <Clock size={14} />
                                                            <p>{moment(notification?.createdAt).format('MMM Do YYYY, hh:mm A')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="/assets/images/default_user.png"
                                                alt="User Profile"
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <MenuItem>
                                            {({ focus }) => (
                                                <Link
                                                    to={'/vendor/profile#0'}
                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Your Profile
                                                </Link>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ focus }) => (
                                                <Link
                                                    to={'/vendor/profile#1'}
                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Settings
                                                </Link>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ focus }) => (
                                                <a
                                                    onClick={handleLogout}
                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 shadow-md">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    as="a"
                                    to={item.href}
                                    className={classNames(
                                        item.current ? 'text-neutral-800' : 'text-neutral-700',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}
