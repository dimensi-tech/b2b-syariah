import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const loginSuccessToast = () => {
  Toast.fire({
    icon: 'success',
    title: 'Anda berhasil login'
  })
}

export const logoutSuccessToast = () => {
  Toast.fire({
    icon: 'success',
    title: 'Anda telah logout'
  })
}