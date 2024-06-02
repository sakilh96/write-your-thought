import Swal from 'sweetalert2';

export const toast = (msg, icon) => {
    Swal.fire({
        text: msg,
        toast: true,
        icon: icon,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
        position: 'top-right',
        color: "white",
        background:"green"
      
    });
};