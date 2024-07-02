import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const VendorRoutes = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    return user != null && user.role === 'vendor' ? <Outlet /> : navigate('/admin/login');
}

export default VendorRoutes