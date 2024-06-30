import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import handleLogout from '../../../components/Logout';
import EditProfileTab from './profile-tabs/EditProfileTab';
import { MoneyRecive, Setting3 } from 'iconsax-react';
import UpdatePasswordTab from './profile-tabs/UpdatePasswordTab';
import PaymentSettings from './profile-tabs/PaymentSettings';

const VendorProfile = () => {
    const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const location = useLocation();
    const toggleUpdatePasswordModal = () => {
        setIsUpdatePasswordModalOpen(!isUpdatePasswordModalOpen);
    };

    useEffect(() => {
        const hash = location.hash;
        const tabNumber = parseInt(hash.replace('#', ''), 10);
        if (!isNaN(tabNumber)) {
            setActiveTab(tabNumber);
        }
    }, [location]);

    const handleTabChange = (newValue) => {
        setActiveTab(newValue);
        window.location.hash = `#${newValue}`;
    };

    return (
        <>
            <div className="flex flex-col items-center w-full bg-neutral-50" style={{ minHeight: 'calc(100vh - 150px)', height: 'auto' }}>
                <section className="w-full bg-white text-neutral-700 border-b">
                    <p className='max-w-[1440px] mx-auto py-5 md:px-10 px-5 text-2xl md:text-left text-center'>
                        Profile Settings
                    </p>
                </section>
                <main className='max-w-[1440px] w-full font-roboto-slab text-neutral-700 py-10'>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        aria-label="Vertical tabs"
                        orientation="vertical"
                        variant='plain'
                        className='md:px-4 px-2 font-roboto-slab gap-y-5 md:flex md:flex-row flex flex-wrap'
                        sx={{ minWidth: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', justifyContent: 'space-around' }}
                    >
                        <TabList
                            className='md:w-[28%] w-full bg-white font-roboto-slab text-neutral-700 border'
                            style={{ padding: '15px', borderRadius: '8px', minWidth: '210px' }}
                            sx={{
                                [`&& .${tabClasses.root}`]: {
                                    bgcolor: 'transparent',
                                    '&:hover': {
                                        bgcolor: `#F7F7F7`,
                                    },
                                    '&.Mui-selected': {
                                        color: `black`,
                                        backgroundColor: '#F7F7F7',
                                    },
                                },
                            }}
                        >
                            <p className='text-lg mb-3'>Preferences</p>
                            <Tab>
                                <Link to={'/vendor/profile#0'} className="flex py-3 items-start w-full text-neutral-700">
                                    <svg class="w-4 h-4 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z" />
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    </svg>
                                    <div className="flex flex-col ml-2 w-[85%]">
                                        <p>Profile Detail</p>
                                        <p className='text-sm mt-1'>Edit personal information and login details.</p>
                                    </div>
                                </Link>
                            </Tab>
                            <Tab>
                                <Link to={'/vendor/profile#1'} className="flex py-3 items-start w-full text-neutral-700">
                                    <MoneyRecive size={16} className='mt-1' />
                                    <div className="flex flex-col ml-2 w-[85%]">
                                        <p>Payment Settings</p>
                                        <p className='text-sm mt-1'>Set up your payment methods inorder to receive payments.</p>
                                    </div>
                                </Link>
                            </Tab>
                            <Tab>
                                <Link onClick={toggleUpdatePasswordModal} className="flex py-3 items-start w-full text-neutral-700">
                                    <svg class="w-4 h-4 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                                    </svg>
                                    <div className="flex flex-col ml-2 w-[85%]">
                                        <p>Login Credentials</p>
                                        <p className='text-sm mt-1'>Edit password of your account for security purposes.</p>
                                    </div>
                                </Link>
                            </Tab>
                            <Tab>
                                <Link className="flex py-3 items-start w-full" onClick={handleLogout}>
                                    <svg class="w-4 h-4 mt-1 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                                    </svg>
                                    <div className="flex flex-col ml-2 w-[85%]">
                                        <p className='text-red-600'>Logout</p>
                                        <p className='text-sm text-red-600 mt-1'>Signout from website and clear all caches.</p>
                                    </div>
                                </Link>
                            </Tab>
                        </TabList>
                        <div className="md:w-[67%] w-full">
                            <TabPanel value={0}>
                                <EditProfileTab />
                            </TabPanel>
                            <TabPanel value={1}>
                                <PaymentSettings />
                            </TabPanel>
                        </div>
                    </Tabs>
                </main>
            </div>
            <UpdatePasswordTab open={isUpdatePasswordModalOpen} onClose={() => setIsUpdatePasswordModalOpen(false)} />
        </>
    )
}

export default VendorProfile