import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserByIdApi } from '../../apis/api';
import SuperAdminNavbar from './SuperAdminNavbar';
import VendorNavbar from './VendorNavbar';

const Navbar = () => {
  const [user, setUser] = useState();
  const location = useLocation();
  const desiredPaths = ["/admin/login", "/admin/register", "/admin/forgot-password"];
  const isDesiredPath = desiredPaths.includes(location.pathname);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      getUserByIdApi(localUser._id).then((res) => {
        if (res.data.success) {
          setUser(res.data.userDetail);
        }
      });
    }
  }, []);

  if (isDesiredPath) {
    return null;
  }

  return (
    <>
      {
        user && user?.role === 'vendor' ?
          <VendorNavbar /> :
          user?.role === 'superadmin' ?
            <SuperAdminNavbar /> :
            null
      }
    </>
  );
};

export default Navbar;
