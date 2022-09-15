export default function validation(values) {
  let errors = {};
  let nameRegex = /^[a-zA-Z]+$/;
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
  let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!values.firstName) {
    errors.firstName = "First Name is required.";
  } else if (!nameRegex.test(values.firstName)) {
    errors.firstName = "first Name is invalid.";
  }
  if (!values.lastName) {
    errors.lastName = "Last Name is required.";
  } else if (!nameRegex.test(values.lastName)) {
    errors.lastName = "Last Name is invalid.";
  }
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email is invalid.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "Password must contain at least six characters, one letter, one number and one special character.";
  }

  return errors;
}
