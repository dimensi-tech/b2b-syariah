const Authorization = () => {

  const isLoggedIn = () => {
    try {
      const ls = localStorage.getItem("auth_user");
      const auth = JSON.parse(ls);
      if (Object.keys(auth).length > 0) {
        return true;
      }else{
        return false;
      }
    }catch(error) {
      return false;
    }
  };

  const login = (response) => {
    try {
      localStorage.setItem("auth_user", JSON.stringify(response));
    }catch(error){
      console.log("error", error);
    }
  };

  const getAuthUser = () => {
    try {
      const ls = localStorage.getItem("auth_user");
      const auth = JSON.parse(ls).auth_user;
      return auth;
    }catch(error) {
      return {};
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("auth_user");
    }catch(error) {
      console.log("error", error);
    }
  };

  return {
    isLoggedIn,
    login,
    getAuthUser,
    logout
  };

};

export default Authorization;
