import { notification } from 'antd'
import jwtDecode from 'jwt-decode'

export const isLoggedIn = () => {
  try {
    const auth = JSON.parse(localStorage.getItem('authUser')) || {}
    return Object.keys(auth)?.length > 0
  } catch(error) {
    console.log('error', error)
  }
}

export const login = (response) => {
  try {
    localStorage.setItem('authUser', JSON.stringify({token: response.jwt}))
  } catch(error) {
    console.log('error', error)
  }
}

export const logout = (t) => {
  try {
    localStorage.removeItem('authUser')
    notification.success({
      message: t('logout.notification.title'),
      description: t('logout.notification.description'),
      placement: 'bottomLeft'
    })
    window.location.reload()
  } catch(error) {
    console.log('error', error)
  }
}

export const currentUser = () => {
  try {
    if (isLoggedIn()) {
      const auth = JSON.parse(localStorage.getItem('authUser'))
      return jwtDecode(auth.token)
    } else {
      return false
    }
  } catch (error) {
    console.log('error', error)
  }
}