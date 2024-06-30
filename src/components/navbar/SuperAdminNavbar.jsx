import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Clock, Notification } from 'iconsax-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const navigation = [
    { name: 'Users', href: '/superadmin/userlist', current: false },
    { name: 'Vendors', href: '/superadmin/vendorList', current: false },
    { name: 'Futsals', href: '/superadmin/futsalList', current: false },
    { name: 'Payment Logs', href: '/superadmin/paymentLogs', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SuperAdminNavbar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8 shadow-md">
                        <div className="relative flex h-16 items-center justify-between max-w-[1340px] mx-auto">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 hover:text-white">
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
                                <Link to={'/superadmin/dashboard'} className="flex flex-shrink-0 items-center">
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
                                    {/* {
                                        notification.length === 0 ? null : <span className='absolute right-1 top-0 w-[15px] h-[15px] rounded-full bg-green-700 text-white text-[10px] flex justify-center items-center'>{notification.length}</span>
                                    } */}
                                    <Notification />
                                </button>
                                <div
                                    className={`absolute top-14 md:right-10 right-0 w-[300px] border bg-white z-50 rounded-md px-3 pt-3 shadow-md transition-opacity duration-300 ease-in-out ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                    style={{ maxHeight: '500px' }}
                                >
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-lg font-bold">Notifications</p>
                                        <button onClick={toggleDrawer}>
                                            <svg className="w-6 h-6 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                    <hr className='my-2' />
                                    <div className="flex gap-3 items-start py-2 border-b hover:bg-neutral-50 p-2">
                                        <input type="text" className='w-[35px] h-[35px] rounded-full bg-teal-500 text-center text-white' defaultValue={'N'} />
                                        <div className="w-full flex flex-col gap-1">
                                            <p>Notification Title</p>
                                            <p className='text-[15px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                            <div className="flex gap-1 items-center text-xs mt-1">
                                                <Clock size={14} />
                                                <p>Jan 14th, 2024</p>
                                            </div>
                                        </div>
                                    </div>
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
                                                    to={'/superadmin/profile'}
                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Your Profile
                                                </Link>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ focus }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Settings
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ focus }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
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
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}
