import Swal from 'sweetalert2';

const handleLogout = async () => {
    return Swal.fire({
        title: 'Are you sure you want to logout?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout it!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            window.location.replace('/admin/login');
        }
    })
}

export default handleLogout