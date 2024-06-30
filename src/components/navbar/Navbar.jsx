import React from 'react';
import VendorNavbar from './VendorNavbar';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const desiredPaths = ["/admin/login", "/admin/register", "/admin/forgot-password"];
  const isDesiredPath = desiredPaths.includes(location.pathname);
  if (isDesiredPath) {
    return null;
  }
  return (
    <>
      <VendorNavbar />
    </>
  )
}

export default Navbar