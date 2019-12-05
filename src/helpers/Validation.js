export const registerValidation = ({email, password, retypePassword}) => {

  const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let errors = [];

  if (!isEmail.test(email)) {
    errors.push({
      type: "EMAIL",
      message: "Email tidak valid!"
    });
  }

  if (password.length < 6) {
    errors.push({
      type: "PASSWORD",
      message: "Password minimal 6 karakter!"
    });
  }

  if (retypePassword !== password) {
    errors.push({
      type: "RETYPE_PASSWORD",
      message: "Password tidak sesuai!"
    })
  }

  return errors;

};
