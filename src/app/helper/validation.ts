const recipeFormError: { [key: string]: any } = {
  name: '',
  imagePath: '',
  description: '',
};
const recipeFormMesseges: { [key: string]: any } = {
  name: {
    required: 'Name is required',
    pattern: 'Name should not conta any special character and numbers',
  },
  imagePath: {
    required: 'Image is required',
  },
};
const authenticationFormError: { [key: string]: any } = {
  email: '',
  password: '',
};
const authenticationFormMessages: { [key: string]: any } = {
  email: {
    required: 'Email is required',
    pattern: 'Please Enter Valid Email',
  },
  password: {
    required: 'Password is required',
  },
};
const allowChartersOnly = '^[a-zA-Z ]+$';
const allowNumbersOnly = '^[0-9]*$';
const allowedMailPattern =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export {
  recipeFormError,
  recipeFormMesseges,
  allowChartersOnly,
  allowNumbersOnly,
  allowedMailPattern,
  authenticationFormError,
  authenticationFormMessages,
};
