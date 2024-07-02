import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const SuperAdminRoutes = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    return user != null && user.role === 'superadmin' ? <Outlet /> : navigate('/admin/login');
}

export default SuperAdminRoutes