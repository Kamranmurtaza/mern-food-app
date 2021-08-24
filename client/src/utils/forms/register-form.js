import { CHECKBOX } from 'utils/form-fields';

export const registerForm = {
  title: 'Register',
  buttonLabel: 'Register',
  formInputs: [
    [
      {
        name: 'firstName',
        label: 'First Name',
        validations: {
          isRequired: true,
        },
      },
      {
        name: 'lastName',
        label: 'Last Name',
        validations: {
          isRequired: true,
        },
      },
    ],
    [
      {
        name: 'email',
        label: 'Email',
        validations: {
          isRequired: true,
          isEmail: true,
        },
      },
    ],
    [
      {
        name: 'password',
        label: 'Password',
        inputProps: {
          type: 'password',
        },
        validations: {
          isRequired: true,
        },
      },
    ],
    [
      {
        name: 'isRestaurantOwner',
        fieldType: CHECKBOX,
        label: 'Are you a restaurant owner?',
        validations: {
          isRequired: false,
        },
      },
    ],
  ],
};
