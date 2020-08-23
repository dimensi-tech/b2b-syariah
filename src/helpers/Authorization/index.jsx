export const isLoggedIn = () => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth_user'))
    return Object.keys(auth).length > 0
  } catch(error) {
    console.log('error', error)
  }
}

export const login = (response) => {
  try {
    localStorage.setItem('auth_user', JSON.stringify(response))
  } catch(error) {
    console.log('error', error)
  }
}

export const currentUser = () => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth_user'))
    return auth.token
  } catch(error) {
    console.log('error', error)
  }
}

export const logout = () => {
  try {
    localStorage.removeItem('auth_user')
  } catch(error) {
    console.log('error', error)
  }
}